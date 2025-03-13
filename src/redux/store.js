import {createStore, applyMiddleware, combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import reposReducer from './reposSlice';
import credentialsReducer from './credentialsSlice';

const rootReducer = combineReducers({
  credentials: credentialsReducer,
  repos: reposReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
