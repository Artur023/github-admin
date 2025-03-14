import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../redux/credentialsSlice';

const CredentialsForm = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCredentials(login, token));
    alert('Данные сохранены');
  };

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
