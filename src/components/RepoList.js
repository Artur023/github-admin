import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchRepos, deleteRepo, updateRepo, createRepo} from '../redux/reposActions';
import RepoForm from './RepoForm';

const RepoList = () => {
  const dispatch = useDispatch();
  const {repos, loading, error} = useSelector((state) => state.repos);
  const {login} = useSelector((state) => state.credentials);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editRepo, setEditRepo] = useState(null);

  useEffect(() => {
    if (login) {
      dispatch(fetchRepos());
    }
  }, [dispatch, login]);

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

  const handleViewRepo = (repo) => {
    alert(JSON.stringify(repo, null, 2));
  };

  return (
    <div>
      <h2>Список репозиториев</h2>
      <button onClick={() => setShowCreateForm(true)}>Создать репозиторий</button>

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
      {repos && repos.length > 0 ? (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id} style={{marginBottom: '10px'}}>
              <strong>{repo.name}</strong> – {repo.description}
              <div>
                <button onClick={() => handleViewRepo(repo)}>Просмотр</button>
                <button onClick={() => setEditRepo(repo)}>Редактировать</button>
                <button onClick={() => handleDeleteRepo(repo.name)}>Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>Репозитории не найдены</p>
      )}
    </div>
  );
};

export default RepoList;
