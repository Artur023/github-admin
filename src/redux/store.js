import { configureStore } from '@reduxjs/toolkit';
import credentialsReducer from './credentialsSlice';
import reposReducer from './reposSlice';

const persistedCredentials = JSON.parse(
  localStorage.getItem('githubCredentials') || 'null'
) || { login: '', token: '' };


const preloadedState = {
  credentials: persistedCredentials,
};

const store = configureStore({
  reducer: {
    credentials: credentialsReducer,
    repos: reposReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('githubCredentials', JSON.stringify(state.credentials));
});

export default store;
