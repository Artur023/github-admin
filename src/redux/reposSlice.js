import {createSlice} from '@reduxjs/toolkit';
import {fetchRepos} from './reposActions';

const initialState = {
  repos: [],
  loading: false,
  error: null,
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setRepos(state, action) {
      state.repos = action.payload;
    },
    addRepo(state, action) {
      state.repos.push(action.payload);
    },
    updateRepoLocal(state, action) {
      const index = state.repos.findIndex(repo => repo.id === action.payload.id);
      if (index !== -1) {
        state.repos[index] = {...state.repos[index], ...action.payload};
      }
    },
    removeRepo(state, action) {
      state.repos = state.repos.filter(repo => {
        return repo.name !== action.payload
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки репозиториев';
      });
  },
});

export const {
  setRepos,
  addRepo,
  updateRepoLocal,
  removeRepo
} = reposSlice.actions;
export default reposSlice.reducer;
