import githubApi, { setAuth } from '../api/githubApi';
import { fetchReposStart, fetchReposSuccess, fetchReposError } from './reposSlice';
import { toast } from 'react-toastify';
import {FETCH_REPOS_SUCCESS} from "../constants";

export const fetchRepos = () => {
  return (dispatch, getState) => {
    dispatch(fetchReposStart());
    const { credentials: { login, token } } = getState();
    setAuth(token);
    githubApi.fetchRepos(login)
      .then(response => {
        dispatch(fetchReposSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchReposError(error.message));
        toast.error(`Ошибка загрузки репозиториев: ${error.message}`);
      });
  };
};

export const createRepo = (repoData) => {
  return (dispatch, getState) => {
    const { credentials: { token } } = getState();
    setAuth(token);
    githubApi.createRepo(repoData)
      .then(() => {
        dispatch(fetchRepos());
        toast.success('Репозиторий успешно создан!');
      })
      .catch(error => {
        toast.error("Ошибка при создании репозитория: " + error.message);
      });
  };
};

export const updateRepo = (repoName, repoData) => {
  return async (dispatch, getState) => {
    const {
      credentials: {token, login},
      repos: {repos},
    } = getState();
    setAuth(token);

    const updatedRepos = repos.map((repo) =>
      repo.name === repoName ? {...repo, ...repoData, isUpdating: true} : repo
    );
    dispatch({type: FETCH_REPOS_SUCCESS, payload: updatedRepos});

    try {
      await githubApi.updateRepo(login, repoName, repoData);
      toast.info(`Репозиторий ${repoName} обновляется`, {autoClose: 30000});
      setTimeout(() => {
        dispatch(fetchRepos(login));
        toast.success('Репозиторий  обновлён', {autoClose: 1000});
      }, 30000);
    } catch (error) {
      toast.error("Ошибка при обновлении репозитория: " + error.message);
      dispatch(fetchRepos(login));
    }
  };
};


export const deleteRepo = (repoName) => {
  return (dispatch, getState) => {
    const { credentials: { login, token } } = getState();
    setAuth(token);
    githubApi.deleteRepo(login, repoName)
      .then(() => {
        dispatch(fetchRepos());
        toast.success('Репозиторий успешно удалён!');
      })
      .catch(error => {
        alert("Ошибка при удалении репозитория: " + error.message);
        toast.error("Ошибка при удалении репозитория: " + error.message);
      });
  };
};
