import { useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const App = () => {
  useEffect(() => {
    axios.get('/api/users/auth-ping')
      .then(res => {
        const authenticated = res.data;
        if (!authenticated) {
          // window.location.href = '/login';
        }
      })
  }, []);

  return (
    <>
      <Nav />
    </>
  );
}

export default App;
