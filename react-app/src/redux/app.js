import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserAuthenticated: false,
  context: {}
};

const appRedux = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsUserAuthenticated: (state, { payload: isAuthenticated }) => { state.isUserAuthenticated = isAuthenticated },
    setAppContext: (state, { payload: context }) => { state.context = context }
  }
});

export default appRedux;
