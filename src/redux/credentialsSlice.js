import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: '',
  token: '',
};

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.login = action.payload.login.trim();
      state.token = action.payload.token;
    },
    clearCredentials(state) {
      state.login = '';
      state.token = '';
    },
  },
});

export const { setCredentials, clearCredentials } = credentialsSlice.actions;
export default credentialsSlice.reducer;
