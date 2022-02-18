import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import AppRoutes from './AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import appRedux from './redux/app';

const pingAuth = () => axios.get('/api/users/auth-ping');

const App = () => {
  const isUserAuthenticated = useSelector(state => state.app.isUserAuthenticated);
  const dispatch = useDispatch();
  const [pinged, setPinged] = useState(false);
  const [gettingAppContext, setGettingAppContext] = useState(false);

  useEffect(() => {
    if (pinged && !isUserAuthenticated) {
      window.location.href = '/login';
    } else if (pinged && isUserAuthenticated) {
      axios
        .get('/api/app/get-context')
        .then((res) => {
          dispatch(appRedux.actions.setAppContext(res.data));
          setGettingAppContext(false);
        })
        .catch(() => setGettingAppContext(false))
      ;
    }
  }, [dispatch, isUserAuthenticated, pinged]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      pingAuth()
        .then((res) => {
          const isAuthenticated = res.data;
          dispatch(appRedux.actions.setIsUserAuthenticated(isAuthenticated));
          setPinged(true);
        })
        .catch(() => {
          dispatch(appRedux.actions.setIsUserAuthenticated(false));
          setPinged(true);
        })
      ;
    }, 30 * 1000);

    console.log('App bootstrapped!!!');
    pingAuth()
      .then((res) => {
        const isAuthenticated = res.data;
        dispatch(appRedux.actions.setIsUserAuthenticated(isAuthenticated));
        setPinged(true);
      })
      .catch(() => {
        dispatch(appRedux.actions.setIsUserAuthenticated(false));
        setPinged(true);
      })
    ;

    return () => {
      console.log('App terminated!!!');
      if (intervalId) {
        clearInterval(intervalId);
        console.log('Clear ping auth');
      }
    };
  }, [dispatch]);

  if (!pinged) return "Bootstrapping...";
  if (pinged && gettingAppContext) {
    // TODO Later change to a new component
    return 'Loading application context...'
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;
