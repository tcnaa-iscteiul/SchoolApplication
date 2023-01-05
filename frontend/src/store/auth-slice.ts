import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import { Status } from '../interfaces/Status'
import { menuActions } from './menu-slice'

type Auth = {
  token: string
  status: string | null
  role: string | null
  userClasses?: string[]
}

const user = getCookie('userClass') || ''
const cookieUser: string[] = user ? JSON.parse(user) : []
const initialState: Auth = {
  token: getCookie('token') || '',
  status: getCookie('status') || null,
  role: getCookie('role') || null,
  userClasses: cookieUser,
}
// TODO:expiration time token

export const isAuthenticated = initialState.token

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = ''
      state.status = null
      state.role = null
      menuActions.addOption('')
      removeCookie('token')
      removeCookie('status')
      removeCookie('role')
      removeCookie('userClass')
    },
    login(state, action: PayloadAction<Auth>) {
      if (action.payload.status !== Status.Inactive) {
        state.token = action.payload.token
        state.status = action.payload.status
        state.role = action.payload.role
        state.userClasses = action.payload.userClasses

        setCookie('role', state.role)
        setCookie('token', state.token)
        setCookie('status', state.status)
        setCookie('userClass', JSON.stringify(state.userClasses))
        //  setTimeout(this.logout, 60);
      }
    },
  },
})

export const authActions = AuthSlice.actions
export default AuthSlice
