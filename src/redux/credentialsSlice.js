const initialState = {
  login: '',
  token: '',
};
const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const setCredentials = (login, token) => ({
  type: SET_CREDENTIALS,
  payload: { login, token },
});

const credentialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREDENTIALS:
      return { ...state, login: action.payload.login, token: action.payload.token };
    default:
      return state;
  }
};

export default credentialsReducer;
