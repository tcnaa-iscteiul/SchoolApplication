import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { Status } from '../interfaces/Status';

type Auth = {
  token: string;
  status: string | null;
  role: string | null;
  userClasses?: string[];
};

const initialState: Auth = {
  token: getCookie('token') || '',
  status: getCookie('status') || null,
  role: getCookie('role') || null,
  userClasses: [],
};
// TODO:expiration time token

export const isAuthenticated = initialState.token;

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = '';
      state.status = null;
      state.role = null;
      removeCookie('token');
      removeCookie('status');
      removeCookie('role');
      removeCookie('userClass');
    },
    login(state, action: PayloadAction<Auth>) {
      if (action.payload.status !== Status.Inactive) {
        state.token = action.payload.token;
        state.status = action.payload.status;
        state.role = action.payload.role;

        setCookie('role', state.role);
        setCookie('token', state.token);
        setCookie('status', state.status);
        //  setTimeout(this.logout, 60);
      }
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice;
