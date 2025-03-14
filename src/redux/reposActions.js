import githubApi, { setAuth } from '../api/githubApi';
import { fetchReposStart, fetchReposSuccess, fetchReposError } from './reposSlice';

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
      })
      .catch(error => {
        alert("Ошибка при создании репозитория: " + error.message);
      });
  };
};

export const updateRepo = (repoName, repoData) => {
  return (dispatch, getState) => {
    const { credentials: { login, token } } = getState();
    setAuth(token);
    githubApi.updateRepo(login, repoName, repoData)
      .then(() => {
        dispatch(fetchRepos());
      })
      .catch(error => {
        alert("Ошибка при обновлении репозитория: " + error.message);
      });
  };
};

export const deleteRepo = (repoName) => {
  return (dispatch, getState) => {
    const { credentials: { login, token } } = getState();
    setAuth(token);
    githubApi.deleteRepo(login, repoName)
      .then(() => {
        dispatch(fetchRepos());
      })
      .catch(error => {
        alert("Ошибка при удалении репозитория: " + error.message);
      });
  };
};
