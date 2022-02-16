import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  useEffect(() => {
    axios.get('/api/users/auth-ping')
      .then(res => {
        const authenticated = res.data;
        if (!authenticated) {
          window.location.href = '/login';
        }
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="/public/login_icon.png" alt="logo" />
      </header>
    </div>
  );
}

export default App;
