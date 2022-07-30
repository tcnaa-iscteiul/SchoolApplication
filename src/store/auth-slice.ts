import { createSlice } from '@reduxjs/toolkit';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { Status } from '../interfaces/Status';

type Auth = {
    token: string,
    status: string | null,
    role: string | null,
}

const initialState: Auth = {
    token: getCookie('token') || '',
    status: getCookie('status') || null,
    role: getCookie('role') || null,
}
//TODO:expiration time token
const calculateRemainingTime = (expirationTime: string) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingTime = adjExpirationTime - currentTime;

    return remainingTime;
}

export const isAuthenticated = initialState.token ? true : false;

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            if (action.payload.status !== Status.Inactive) {

                state.token = action.payload.token;
                state.status = action.payload.status;
                state.role = action.payload.role;

                setCookie('role', state.role);
                setCookie('token', state.token);
                setCookie('status', state.status);
            }

        },
        logout(state) {
            state.token = '';
            state.status = null;
            state.role = null;
            removeCookie('token');
            removeCookie('status');
            removeCookie('role');
        },
    }
});

export const authActions = AuthSlice.actions;
export default AuthSlice;
