import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    error: { main: '#d32f2f' },
    success: { main: '#388e3c' },
    background: { paper: '#fff', default: '#f5f5f5' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
  shape: { borderRadius: 5 },
  spacing: 8,
});

export default theme;
