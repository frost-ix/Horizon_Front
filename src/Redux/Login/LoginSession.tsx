import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LoginSessionItem from '../../Interface/LoginSessionInterface';
import { RootState } from '../store';

const initialState: LoginSessionItem = {
    userName: null,
    userId: null,
  };
  

const LoginSession = createSlice({
    name: 'LoginSession',
    initialState,
    reducers: {
        ReduxLoginSessionAction: (state, action: PayloadAction<LoginSessionItem>) => {
        state.userName = action.payload.userName;
        state.userId = action.payload.userId;
      }
    }
  });


export const { ReduxLoginSessionAction } = LoginSession.actions;
export const selectLoginSession = (state: RootState) => state.LoginSession;
export default LoginSession.reducer;