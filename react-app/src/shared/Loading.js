import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

const Loading = ({
  loading = true,
  loadingMessage = 'Loading...',
  children
}) => {
  return (
    <>
      {children}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: 'absolute',
          flexDirection: 'column'
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography marginTop={1}>{loadingMessage}</Typography>
      </Backdrop>
    </>
  );
};

export default Loading;
