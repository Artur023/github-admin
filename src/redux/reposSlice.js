import {FETCH_REPOS_ERROR, FETCH_REPOS_START, FETCH_REPOS_SUCCESS} from "../constants";

const initialState = {
  loading: false,
  error: null,
  repos: [],
};

export const fetchReposStart = () => ({
  type: FETCH_REPOS_START
});
export const fetchReposSuccess = (repos) => ({
  type: FETCH_REPOS_SUCCESS,
  payload: repos
});
export const fetchReposError = (error) => ({
  type: FETCH_REPOS_ERROR,
  payload: error
});

const reposReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPOS_START:
      return { ...state, loading: true, error: null };
    case FETCH_REPOS_SUCCESS:
      return { ...state, repos: action.payload, loading: false };
    case FETCH_REPOS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reposReducer;
