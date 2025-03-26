import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials, clearCredentials } from '../redux/credentialsSlice';
import { toast } from 'react-toastify';

import { TextField, Button, Box, Typography } from '@mui/material';

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
        headers: { Authorization: `token ${token}` },
      });
      const fetchedLogin = response.data.login;
      if (login.trim().toLowerCase() !== fetchedLogin.toLowerCase()) {
        toast.error(`Введённый логин (${login.trim()}) не соответствует токену. Правильный логин: ${fetchedLogin}.`);
        setLoading(false);
        return;
      }
      dispatch(setCredentials({ login: login.trim(), token }));
      toast.success(`Вы успешно вошли, ${login.trim()}`);
    } catch (error) {
      toast.error('Неверный токен или ошибка при получении данных пользователя.');
    }
    setLoading(false);
  };

  if (credentials.login && credentials.token) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Вы успешно вошли!
        </Typography>
        <Typography variant="body1">Логин: {credentials.login}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => dispatch(clearCredentials())}>
          Сменить учётные данные
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="GitHub Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Введите логин"
        required
      />
      <TextField
        label="GitHub Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Введите токен"
        type="password"
        required
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Проверка...' : 'Сохранить'}
      </Button>
    </Box>
  );
};

export default CredentialsForm;
