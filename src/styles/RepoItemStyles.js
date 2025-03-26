import { styled } from '@mui/material/styles';
import { ListItem } from '@mui/material';

export const RepoItemContainer = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(1),
  border: '1px solid #ddd',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
}));

export const RepoHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const RepoName = styled('span')({
  fontWeight: 'bold',
});

export const RepoStatus = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isPrivate',
})(({ theme, isPrivate }) => ({
  color: isPrivate ? theme.palette.error.main : theme.palette.success.main,
  fontSize: theme.typography.caption.fontSize,
}));
