import React from 'react';
import Alert from '@mui/material/Alert';

const Loading = ({
  loading = true,
  loadingMessage = 'Loading...',
  error = null,
  children
}) => {
  if (loading) {
    return loadingMessage || 'Loading...';
  }

  if (error) {
    return <Alert severity="error" sx={{ marginBottom: 1 }}>{error}</Alert>;
  }

  return children;
};

export default Loading;
