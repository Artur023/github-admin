import React, {useState} from 'react';
import CredentialsForm from './components/CredentialsForm';
import RepoList from './components/RepoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [screen, setScreen] = useState('credentials');

  return (
    <div>
      {console.log('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')}
      <nav style={{marginBottom: '20px'}}>
        <button onClick={() => setScreen('credentials')}>Настройка GitHub</button>
        <button onClick={() => setScreen('repos')}>Список репозиториев</button>
      </nav>
      {screen === 'credentials' && <CredentialsForm/>}
      {screen === 'repos' && <RepoList/>}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
