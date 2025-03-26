// src/components/RepoForm.js
import React from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RepoForm = ({ mode, initialData = {}, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      name: initialData.name || '',
      description: initialData.description || '',
      visibility: initialData.visibility || 'public',
    },
    onSubmit: (values) => {
      const data = {
        description: values.description,
        visibility: values.visibility,
      };
      if (mode === 'create') {
        data.name = values.name;
      }
      onSubmit(data);
    },
    validationSchema: Yup.object({
      name:
        mode === 'create'
          ? Yup.string().trim().required('Имя репозитория обязательно')
          : Yup.string().trim(),
    }),
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {mode === 'create' && (
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Имя репозитория"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          required
        />
      )}
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Описание"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <FormControl fullWidth>
        <InputLabel id="visibility-label">Видимость</InputLabel>
        <Select
          labelId="visibility-label"
          id="visibility"
          name="visibility"
          value={formik.values.visibility}
          label="Видимость"
          onChange={formik.handleChange}
        >
          <MenuItem value="public">Публичный</MenuItem>
          <MenuItem value="private">Приватный</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button type="submit" variant="contained">
          {mode === 'create' ? 'Создать' : 'Обновить'}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Отмена
        </Button>
      </Box>
    </Box>
  );
};

export default RepoForm;
