import { configureStore } from '@reduxjs/toolkit';
import appRedux from './app';
import counterSlice from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    app: appRedux.reducer
  }
});

export default store;
