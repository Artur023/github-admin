import React from 'react';
import { Typography, Button } from '@mui/material';
import { ModalOverlay, ModalPaper, CloseButton } from '../styles/ModalStyles';
import {RepoName} from "../styles/RepoItemStyles";

const RepoDetailModal = ({ repo, onClose }) => {
  if (!repo) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalPaper onClick={handleContentClick}>
        <Typography variant="h5">
          <RepoName>{repo.name}</RepoName>
        </Typography>
        <Typography variant="body1">
          <strong>Описание:</strong> {repo.description || 'Отсутствует'}
        </Typography>
        <Typography variant="body1">
          <strong>Ссылка:</strong>{' '}
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.html_url}
          </a>
        </Typography>
        <Typography variant="body1">
          <strong>Видимость:</strong>{' '}
          {repo.visibility === "public" ? "Публичный" : "Приватный"}
        </Typography>
        <CloseButton variant="contained" onClick={onClose}>
          Закрыть
        </CloseButton>
      </ModalPaper>
    </ModalOverlay>
  );
};

export default RepoDetailModal;
