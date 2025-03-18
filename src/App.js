import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CredentialsForm from './components/CredentialsForm';
import RepoList from './components/RepoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { login, token } = useSelector((state) => state.credentials);
  const initialScreen = (login && token) ? 'repos' : 'credentials';
  const [screen, setScreen] = useState(initialScreen);

  return (
    <div className="container">
      <nav>
        <button className={'navButton'} onClick={() => setScreen('credentials')}>
          Настройка GitHub
        </button>
        <button className={'navButton'} onClick={() => setScreen('repos')}>
          Список репозиториев
        </button>
      </nav>
      {screen === 'credentials' && <CredentialsForm />}
      {screen === 'repos' && <RepoList />}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
