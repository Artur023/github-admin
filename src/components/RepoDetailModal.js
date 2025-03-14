import React from 'react';

const RepoDetailModal = ({ repo, onClose }) => {
  if (!repo) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff', padding: '20px', borderRadius: '4px',
        maxWidth: '600px', width: '100%'
      }}>
        <h2>{repo.name}</h2>
        <p><strong>Описание:</strong> {repo.description || 'Отсутствует'}</p>
        <p><strong>Язык:</strong> {repo.language || 'Не указан'}</p>
        <p>
          <strong>Ссылка:</strong> <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a>
        </p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default RepoDetailModal;
