import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setCredentials} from '../redux/credentialsSlice';
import {toast} from 'react-toastify';

const CredentialsForm = () => {
  const dispatch = useDispatch();
  const credentials = useSelector(state => state.credentials);
  const [login, setLogin] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login.trim()) {
      toast.error("Пожалуйста, введите логин");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {Authorization: `token ${token}`},
      });
      const fetchedLogin = response.data.login;
      if (login.trim() && login.trim().toLowerCase() !== fetchedLogin.toLowerCase()) {
        toast.error(`Введённый логин (${login.trim()}) не соответствует токену. Правильный логин: ${fetchedLogin}.`);
        setLoading(false);
        return;
      }

      dispatch(setCredentials(login.trim(), token));
      toast.success(`Вы успешно вошли, ${login.trim()}`);
    } catch (error) {
      toast.error('Неверный токен или ошибка при получении данных пользователя.');
    }
    setLoading(false);
  };

  if (credentials.login && credentials.token) {
    return (
      <div className={"modal-content"}>
        <h2>Вы успешно вошли!</h2>
        <p>Перейдите на страницу <strong>"Список репозиториев"</strong>
        </p>
        <button onClick={() => dispatch(setCredentials('', ''))}>
          Сменить учётные данные
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>GitHub Token:</label>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Введите токен"
          required
        />
      </div>
      <div>
        <label>GitHub Login:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Введите логин или оставьте пустым"
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Проверка...' : 'Сохранить'}
      </button>
    </form>
  );
};

export default CredentialsForm;
