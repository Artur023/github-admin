import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCredentials} from '../redux/credentialsSlice';
import {toast} from "react-toastify";

const CredentialsForm = () => {
  const dispatch = useDispatch();
  const credentials = useSelector(state => state.credentials);
  const [login, setLogin] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCredentials(login, token));
    toast.success(`Вы успешно вошли ${login} `);
  };
  if (credentials.login && credentials.token) {
    return (
      <div>
        <h2>Вы успешно вошли!</h2>
        <p>Логин: {credentials.login}</p>
        <button onClick={() => dispatch(setCredentials('', ''))}>
          Сменить учётные данные
        </button>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>GitHub Login:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Введите логин"
          required
        />
      </div>
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
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default CredentialsForm;
