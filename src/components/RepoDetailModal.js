import React from 'react';

const RepoDetailModal = ({ repo, onClose }) => {
  if (!repo) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{repo.name}</h2>
        <p><strong>Описание:</strong> {repo.description || 'Отсутствует'}</p>
        <p><strong>Язык:</strong> {repo.language || 'Не указан'}</p>
        <p>
          <strong>Ссылка:</strong> <a href={repo.html_url} target="_blank"
                                      rel="noopener noreferrer">{repo.html_url}</a>
        </p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default RepoDetailModal;
