import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { ModalOverlay, ModalPaper, CloseButton } from '../styles/ModalStyles';
import RepoForm from './RepoForm';

const RepoEditModal = ({ repo, onClose, onSubmit }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (repoData) => {
    setIsUpdating(true);
    await onSubmit(repoData);
    setIsUpdating(false);
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!repo) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalPaper onClick={handleContentClick}>
        <Typography variant="h5" gutterBottom>
          Редактировать репозиторий: {repo.name}
        </Typography>
        <RepoForm mode="update" initialData={repo} onSubmit={handleSubmit} onCancel={onClose} />
        {isUpdating && <Typography variant="body2">Обновление...</Typography>}
        <CloseButton variant="contained" onClick={onClose}>
          Закрыть
        </CloseButton>
      </ModalPaper>
    </ModalOverlay>
  );
};

export default RepoEditModal;
