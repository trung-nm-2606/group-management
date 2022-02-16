import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

const pingAuth = () => axios.get('/api/users/auth-ping');

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      pingAuth()
        .then(res => {
          const authenticated = res.data;
          if (!authenticated) {
            window.location.href = '/login';
          } else {
            setAuth(true);
          }
        });
    }, 30 * 1000);

    console.log('App bootstrapped!!!');
    pingAuth()
      .then(res => {
        const authenticated = res.data;
        if (!authenticated) {
          window.location.href = '/login';
        } else {
          setAuth(true);
        }
      });

    return () => {
      console.log('App terminated!!!');
      if (intervalId) {
        clearInterval(intervalId);
        console.log('Clear ping auth');
      }
    };
  }, []);

  if (!auth) return 'Bootstrapping...'

  return (
    <>
      <Nav />
    </>
  );
}

export default App;
