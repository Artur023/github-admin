import React from 'react';
import RepoForm from './RepoForm';

const RepoEditModal = ({ repo, onClose, onSubmit }) => {
  if (!repo) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактировать репозиторий: {repo.name}</h2>
        <RepoForm
          mode="update"
          initialData={repo}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default RepoEditModal;
