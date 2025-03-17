import React, {useEffect, useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchRepos, deleteRepo, updateRepo, createRepo} from '../redux/reposActions';
import RepoItem from './RepoItem';
import RepoSortOptions from './RepoSortOptions';
import RepoDetailModal from './RepoDetailModal';
import RepoEditModal from './RepoEditModal';
import RepoForm from './RepoForm';

const RepoList = () => {
  const dispatch = useDispatch();
  const {repos = [], loading, error} = useSelector((state) => state.repos);
  const {login} = useSelector((state) => state.credentials);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editRepo, setEditRepo] = useState(null);
  const [viewRepo, setViewRepo] = useState(null);
  const [sortOption, setSortOption] = useState('date');

  useEffect(() => {
    if (login && repos.length === 0) {
      dispatch(fetchRepos(login));
    }
  }, [dispatch, login, repos.length]);

  const handleReload = () => {
    dispatch(fetchRepos(login));
  };

  const handleCreateRepo = (repoData) => {
    dispatch(createRepo(repoData));
    setShowCreateForm(false);
  };

  const handleUpdateRepo = (repoData) => {
    if (editRepo) {
      dispatch(updateRepo(editRepo.name, repoData));
      setEditRepo(null);
    }
  };

  const handleDeleteRepo = (repoName) => {
    if (window.confirm(`Вы уверены, что хотите удалить репозиторий ${repoName}?`)) {
      dispatch(deleteRepo(repoName));
    }
  };

  const sortedRepos = useMemo(() => {
    const sorted = [...repos];
    if (sortOption === 'alphabetical') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'date') {
      sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
    return sorted;
  }, [repos, sortOption]);

  if (!login) {
    return <p>Пожалуйста, войдите, чтобы просмотреть репозитории.</p>;
  }

  return (
    <div>
      <h2>Список репозиториев</h2>
      <div className="repo-header">
        <span className="repo-account" style={{color: 'green'}}>
          Ваш аккаунт: {login}
        </span>
        <button onClick={handleReload}>Обновить список</button>
      </div>

      <RepoSortOptions sortOption={sortOption} onSortChange={setSortOption}/>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Создать репозиторий</h3>
            <RepoForm mode="create" onSubmit={handleCreateRepo}
                      onCancel={() => setShowCreateForm(false)}/>
          </div>
        </div>
      )}

      {loading && <p>Загрузка...</p>}
      {error && <p style={{color: 'red'}}>Ошибка: {error}</p>}

      {sortedRepos.length > 0 ? (
        <ul className="repo-list">
          {sortedRepos.map((repo) => (
            <RepoItem
              key={repo.id}
              repo={repo}
              onView={setViewRepo}
              onEdit={setEditRepo}
              onDelete={handleDeleteRepo}
            />
          ))}
        </ul>
      ) : (
        !loading && <p>Репозитории не найдены</p>
      )}

      {viewRepo && <RepoDetailModal repo={viewRepo} onClose={() => setViewRepo(null)}/>}
      {editRepo && (
        <RepoEditModal repo={editRepo} onClose={() => setEditRepo(null)}
                       onSubmit={handleUpdateRepo}/>
      )}
    </div>
  );
};

export default RepoList;
