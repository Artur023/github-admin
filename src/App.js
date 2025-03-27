import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CredentialsForm from './components/CredentialsForm';
import RepoList from './components/RepoList';
import {useSelector} from 'react-redux';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const App = () => {
  const { login, token } = useSelector((state) => state.credentials);
  const isLoggedIn = login && token;

  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{flexGrow: 1, borderRadius: 5}}>
              GitHub Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/credentials"
            element={isLoggedIn ? <Navigate to="/repos"/> : <CredentialsForm/>}
          />
          <Route
            path="/repos"
            element={isLoggedIn ? <RepoList/> : <Navigate to="/credentials"/>}
          />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/repos" : "/credentials"}/>}/>
        </Routes>
      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
