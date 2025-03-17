import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchRepos, deleteRepo, updateRepo, createRepo} from '../redux/reposActions';
import RepoForm from './RepoForm';
import RepoDetailModal from './RepoDetailModal';
import {toast} from 'react-toastify';

const RepoList = () => {
  const dispatch = useDispatch();
  const {repos = [], loading, error} = useSelector((state) => state.repos);
  const {login} = useSelector((state) => state.credentials);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editRepo, setEditRepo] = useState(null);
  const [viewRepo, setViewRepo] = useState(null);

  useEffect(() => {
    if (login && repos.length === 0) {
      dispatch(fetchRepos(login));
    }
  }, [dispatch, login, repos.length]);

  const handleReload = () => {
    dispatch(fetchRepos(login));
  };

  // Поскольку мы работаем только с собственным аккаунтом, isOwn всегда true
  const isOwn = true;

  const handleCreateRepo = (repoData) => {
    if (!isOwn) {
      toast.error("Создавать репозитории можно только для своего аккаунта.");
      return;
    }
    dispatch(createRepo(repoData));
    setShowCreateForm(false);
  };

  const handleUpdateRepo = (repoData) => {
    if (!isOwn) {
      toast.error("Редактировать репозитории можно только для своего аккаунта.");
      return;
    }
    if (editRepo) {
      dispatch(updateRepo(editRepo.name, repoData));
      setEditRepo(null);
    }
  };

  const handleDeleteRepo = (repoName) => {
    if (!isOwn) {
      toast.error("Удалять репозитории можно только для своего аккаунта.");
      return;
    }
    if (window.confirm(`Вы уверены, что хотите удалить репозиторий ${repoName}?`)) {
      dispatch(deleteRepo(repoName));
    }
  };

  if (!login) {
    return (
      <div>
        <p>Пожалуйста, войдите, чтобы просмотреть репозитории.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Список репозиториев</h2>
      <div style={{marginBottom: '20px'}}>
        <span style={{marginRight: '10px', color: 'green'}}>
          Ваш аккаунт: {login}
        </span>
        <button onClick={handleReload}>Обновить список</button>
      </div>

      {isOwn && (
        <button onClick={() => setShowCreateForm(true)}>Создать репозиторий</button>
      )}

      {showCreateForm && (
        <div>
          <h3>Создать репозиторий</h3>
          <RepoForm
            mode="create"
            onSubmit={handleCreateRepo}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {editRepo && (
        <div>
          <h3>Редактировать репозиторий: {editRepo.name}</h3>
          <RepoForm
            mode="update"
            initialData={editRepo}
            onSubmit={handleUpdateRepo}
            onCancel={() => setEditRepo(null)}
          />
        </div>
      )}

      {loading && <p>Загрузка...</p>}
      {error && <p style={{color: 'red'}}>Ошибка: {error}</p>}
      {repos.length > 0 ? (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id} style={{marginBottom: '10px'}}>
              <strong>{repo.name}</strong> – {repo.description}
              <div>
                <button onClick={() => setViewRepo(repo)}>Просмотр</button>
                <button onClick={() => setEditRepo(repo)}>Редактировать</button>
                <button onClick={() => handleDeleteRepo(repo.name)}>Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>Репозитории не найдены</p>
      )}

      {viewRepo && (
        <RepoDetailModal repo={viewRepo} onClose={() => setViewRepo(null)}/>
      )}
    </div>
  );
};

export default RepoList;
