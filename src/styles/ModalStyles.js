import {styled} from '@mui/material/styles';
import {Box, Paper, Button, Typography} from '@mui/material';


export const ModalOverlay = styled(Box)(({theme}) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
}));

export const ModalPaper = styled(Paper)(({theme}) => ({
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: 600,
  borderRadius: theme.shape.borderRadius,
}));

export const ModalText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const CloseButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
