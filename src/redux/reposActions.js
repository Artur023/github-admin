import { createAsyncThunk } from '@reduxjs/toolkit';
import githubApi, { setAuth } from '../api/githubApi';
import { toast } from 'react-toastify';
import { addRepo, updateRepoLocal, removeRepo } from './reposSlice';

export const fetchRepos = createAsyncThunk(
  'repos/fetchRepos',
  async (login, { getState, rejectWithValue }) => {
    const { token } = getState().credentials;
    setAuth(token);
    try {
      const response = await githubApi.fetchRepos(login);
      return response.data;
    } catch (error) {
      toast.error('Ошибка загрузки репозиториев');
      return rejectWithValue(error.message);
    }
  }
);

export const createRepo = createAsyncThunk(
  'repos/createRepo',
  async (repoData, { getState, dispatch, rejectWithValue }) => {
    const { token, login } = getState().credentials;
    setAuth(token);
    try {
      const response = await githubApi.createRepo(repoData);
      dispatch(addRepo(response.data));
      toast.success('Репозиторий успешно создан!');
    } catch (error) {
      toast.error('Ошибка при создании репозитория');
      return rejectWithValue(error.message);
    }
  }
);

export const updateRepo = createAsyncThunk(
  'repos/updateRepo',
  async ({ repoName, repoData, login }, { dispatch, rejectWithValue }) => {
    try {
      const response = await githubApi.updateRepo(login, repoName, repoData);
      dispatch(updateRepoLocal(response.data));
      toast.success('Репозиторий успешно обновлён!');
    } catch (error) {
      toast.error('Ошибка при обновлении репозитория');
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRepo = createAsyncThunk(
  'repos/deleteRepo',
  async (repoName,  { getState, dispatch, rejectWithValue }) => {
    const { token, login } = getState().credentials;
    setAuth(token);
    try {
      await githubApi.deleteRepo(login, repoName);
      dispatch(removeRepo(repoName));
      toast.success('Репозиторий успешно удалён!');
    } catch (error) {
      toast.error('Ошибка при удалении репозитория');
      return rejectWithValue(error.message);
    }
  }
);
