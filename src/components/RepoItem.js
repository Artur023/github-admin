import React from 'react';
import {
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  ListItemText,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  RepoItemContainer,
  RepoHeader,
  RepoName,
  RepoStatus,
} from '../styles/RepoItemStyles';

const RepoItem = ({ repo, onView, onEdit, onDelete }) => {
  const handleContainerClick = () => {
    onView(repo);
  };

  return (
    <RepoItemContainer onClick={handleContainerClick} sx={{ cursor: 'pointer' }}>
      <ListItemText
        primary={
          <RepoHeader>
            <RepoName>{repo.name}</RepoName>
            <RepoStatus isPrivate={repo.private}>
              {repo.private ? 'Приватный' : 'Публичный'}
            </RepoStatus>
          </RepoHeader>
        }
        secondary={repo.description}
      />
      <ListItemSecondaryAction>
        <Tooltip title="Просмотр">
          <IconButton
            edge="end"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              onView(repo);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Редактировать">
          <IconButton
            edge="end"
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(repo);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить">
          <IconButton
            edge="end"
            sx={{ color: 'error.main' }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(repo.name);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </RepoItemContainer>
  );
};

export default RepoItem;
