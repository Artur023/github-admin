import React from 'react';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

const RepoItem = ({ repo, onView, onEdit, onDelete }) => {
  return (
    <li className="repo-item">
      <ComputerDesktopIcon className="repo-icon" />
      <div className="repo-info">
        <strong>{repo.name}</strong> – {repo.description}
      </div>
      <div className="repo-actions">
        <button onClick={() => onView(repo)}>Просмотр</button>
        <button onClick={() => onEdit(repo)}>Редактировать</button>
        <button onClick={() => onDelete(repo.name)}>Удалить</button>
      </div>
    </li>
  );
};

export default RepoItem;
