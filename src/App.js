import React, {useState} from 'react';
import CredentialsForm from './components/CredentialsForm';
import RepoList from './components/RepoList';

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
    </div>
  );
};

export default App;
