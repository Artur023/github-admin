import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

/**
 * Обновляет настройки axios для авторизации.
 * Вызывайте эту функцию сразу после установки учетных данных.
 *
 * @param {string} token - GitHub API токен.
 */
export const setAuth = (token) => {
  axios.defaults.baseURL = API_BASE_URL;
  axios.defaults.headers.common['Authorization'] = `token ${token}`;
};

const githubApi = {
  /**
   * Получает список репозиториев для заданного пользователя.
   * Использует GET /users/:username/repos.
   *
   * @param {string} login - Логин владельца репозиториев.
   * @returns {Promise} - Промис с данными репозиториев.
   */
  fetchRepos: (login) => {
    return axios.get(`/users/${login}/repos`);
  },

  /**
   * Создает новый репозиторий для аутентифицированного пользователя.
   * Использует POST /user/repos.
   *
   * @param {object} data - Данные нового репозитория (name, description, visibility).
   * @returns {Promise} - Промис с созданным репозиторием.
   */
  createRepo: (data) => {
    return axios.post('/user/repos', data);
  },

  /**
   * Обновляет репозиторий по имени для заданного пользователя.
   * Использует PATCH /repos/:owner/:repo.
   *
   * @param {string} login - Логин владельца репозитория.
   * @param {string} repoName - Название репозитория.
   * @param {object} data - Данные для обновления (description, visibility).
   * @returns {Promise} - Промис с обновленными данными репозитория.
   */
  updateRepo: (login, repoName, data) => {
    return axios.patch(`/repos/${login}/${repoName}`, data);
  },

  /**
   * Удаляет репозиторий по имени для заданного пользователя.
   * Использует DELETE /repos/:owner/:repo.
   *
   * @param {string} login - Логин владельца репозитория.
   * @param {string} repoName - Название репозитория.
   * @returns {Promise} - Промис с результатом удаления.
   */
  deleteRepo: (login, repoName) => {
    return axios.delete(`/repos/${login}/${repoName}`);
  },

  /**
   * Получает подробную информацию о репозитории.
   * Использует GET /repos/:owner/:repo.
   *
   * @param {string} login - Логин владельца репозитория.
   * @param {string} repoName - Название репозитория.
   * @returns {Promise} - Промис с данными репозитория.
   */
  viewRepo: (login, repoName) => {
    return axios.get(`/repos/${login}/${repoName}`);
  },
};

export default githubApi;
