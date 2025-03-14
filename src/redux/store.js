import {createStore, applyMiddleware, combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import reposReducer from './reposSlice';
import credentialsReducer from './credentialsSlice';

const rootReducer = combineReducers({
  credentials: credentialsReducer,
  repos: reposReducer,
});

const persistedCredentials = JSON.parse(localStorage.getItem('githubCredentials')) || {
  login: '',
  token: '',
};

const preloadedState = {
  credentials: persistedCredentials,
};

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk),
);
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('githubCredentials', JSON.stringify(state.credentials));
});

export default store;
