import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

export const setAuth = (token) => {
  axios.defaults.baseURL = API_BASE_URL;
  axios.defaults.headers.common['Authorization'] = `token ${token}`;
};

const githubApi = {
  fetchRepos: (login) => axios.get(`/users/${login}/repos`),
  createRepo: (data) => axios.post('/user/repos', data),
  updateRepo: (login, repoName, data) => axios.patch(`/repos/${login}/${repoName}`, data),
  deleteRepo: (login, repoName) => axios.delete(`/repos/${login}/${repoName}`),
  viewRepo: (login, repoName) => axios.get(`/repos/${login}/${repoName}`),
};

export default githubApi;
