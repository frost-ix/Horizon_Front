import { configureStore } from '@reduxjs/toolkit';
import LoginSessionReducer from './Login/LoginSession';

const store = configureStore({
  reducer: {
    LoginSession: LoginSessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;