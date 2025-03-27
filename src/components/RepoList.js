import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepos, deleteRepo, updateRepo, createRepo } from '../redux/reposActions';
import RepoItem from './RepoItem';
import RepoSortOptions from './RepoSortOptions';
import RepoDetailModal from './RepoDetailModal';
import RepoEditModal from './RepoEditModal';
import RepoForm from './RepoForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { Box, Typography, Button, Paper, List } from '@mui/material';

const RepoList = () => {
  const dispatch = useDispatch();
  const { repos, loading, error } = useSelector((state) => state.repos);
  const { login } = useSelector((state) => state.credentials);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editRepo, setEditRepo] = useState(null);
  const [viewRepo, setViewRepo] = useState(null);
  const [sortOption, setSortOption] = useState('date');

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState(null);

  useEffect(() => {
    if (login && repos.length === 0) {
      dispatch(fetchRepos(login));
    }
  }, [dispatch, login, repos.length]);

  const sortedRepos = useMemo(() => {
    const sorted = [...repos];
    if (sortOption === 'alphabetical') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'date') {
      sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
    return sorted;
  }, [repos, sortOption]);

  const handleCreateRepo = (repoData) => {
    dispatch(createRepo(repoData));
    setShowCreateForm(false);
  };

  const handleUpdateRepo = (repoData) => {
    if (editRepo) {
      dispatch(updateRepo({ repoName: editRepo.name, repoData, login }));
      setEditRepo(null);
    }
  };

  const handleDeleteClick = (repoName) => {
    setRepoToDelete(repoName);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (repoToDelete) {
      dispatch(deleteRepo(repoToDelete));
    }
    setDeleteDialogOpen(false);
    setRepoToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRepoToDelete(null);
  };

  if (!login) {
    return <Typography variant="body1">Пожалуйста, войдите, чтобы просмотреть репозитории.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Список репозиториев
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle2" color="green">
          Ваш аккаунт: {login}
        </Typography>
      </Box>
      <RepoSortOptions sortOption={sortOption} onSortChange={setSortOption} />
      {showCreateForm && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Создать репозиторий</Typography>
          <RepoForm mode="create" onSubmit={handleCreateRepo} onCancel={() => setShowCreateForm(false)} />
        </Paper>
      )}
      {loading && <Typography variant="body1">Загрузка...</Typography>}
      {error && <Typography variant="body1" color="error">Ошибка: {error}</Typography>}
      {sortedRepos.length > 0 ? (
        <List>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => setShowCreateForm(true)}>
              Создать репозиторий
            </Button>
          </Box>
          {sortedRepos.map((repo) => (
            <RepoItem
              key={repo.id}
              repo={repo}
              onView={(r) => setViewRepo(r)}
              onEdit={(r) => setEditRepo(r)}
              onDelete={handleDeleteClick}
            />
          ))}
        </List>
      ) : (
        !loading && <Typography variant="body1">Репозитории не найдены</Typography>
      )}
      {viewRepo && <RepoDetailModal repo={viewRepo} onClose={() => setViewRepo(null)} />}
      {editRepo && <RepoEditModal repo={editRepo} onClose={() => setEditRepo(null)} onSubmit={handleUpdateRepo} />}

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default RepoList;
