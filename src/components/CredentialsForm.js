import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials, clearCredentials } from '../redux/credentialsSlice';
import { toast } from 'react-toastify';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CredentialsForm = () => {
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.credentials);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      login: '',
      token: '',
    },
    validationSchema: Yup.object({
      login: Yup.string().required('Пожалуйста, введите логин'),
      token: Yup.string().required('Пожалуйста, введите токен'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.github.com/user', {
          headers: { Authorization: `token ${values.token}` },
        });
        const fetchedLogin = response.data.login;


        if (values.login.toLowerCase() !== fetchedLogin.toLowerCase()) {

          toast.error(
            `Введённый логин (${values.login}) не соответствует токену. Правильный логин: ${fetchedLogin}.`
          );
          setLoading(false);
          return;
        }
        dispatch(setCredentials({login: values.login, token: values.token}));
        toast.success(`Вы успешно вошли, ${values.login}`);
      } catch (error) {
        toast.error('Неверный токен или ошибка при получении данных пользователя.');
      }
      setLoading(false);
    },
  });

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
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        fullWidth
        label="GitHub Login"
        name="login"
        value={formik.values.login}
        onChange={formik.handleChange}
        onBlur={(e) => {
          {
            console.log(e)
          }
          formik.setFieldValue('login', e.target.value.trim());
          formik.handleBlur(e);
        }}
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && formik.errors.login}
        required
      />
      <TextField
        fullWidth
        label="GitHub Token"
        name="token"
        type="password"
        value={formik.values.token}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.token && Boolean(formik.errors.token)}
        helperText={formik.touched.token && formik.errors.token}
        required
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Проверка...' : 'Сохранить'}
      </Button>
    </Box>
  );
};

export default CredentialsForm;
