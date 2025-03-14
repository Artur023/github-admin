import githubApi, { setAuth } from '../api/githubApi';
import { fetchReposStart, fetchReposSuccess, fetchReposError } from './reposSlice';
import { toast } from 'react-toastify';

export const fetchRepos = () => {
  return (dispatch, getState) => {
    dispatch(fetchReposStart());
    const { credentials: { login, token } } = getState();
    setAuth(token);
    githubApi.fetchRepos(login)
      .then(response => {
        dispatch(fetchReposSuccess(response.data));
        toast.success('Репозитории спешно загружены!');
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
  return (dispatch, getState) => {
    const { credentials: { login, token } } = getState();
    setAuth(token);
    githubApi.updateRepo(login, repoName, repoData)
      .then(() => {
        dispatch(fetchRepos());
        toast.success('Репозиторий успешно обновлён!');
      })
      .catch(error => {
        toast.error("Ошибка при обновлении репозитория: " + error.message);
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
        toast.success('Репозиторий успешно удалён!');
      })
      .catch(error => {
        alert("Ошибка при удалении репозитория: " + error.message);
        toast.error("Ошибка при удалении репозитория: " + error.message);
      });
  };
};
