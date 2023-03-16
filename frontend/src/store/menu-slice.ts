import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IClass } from '../interfaces/IClass'

type MenuState = {
  option: string
  email: string
  userClass: IClass[]
}

const initialState: MenuState = {
  option: '',
  email: '',
  userClass: [],
}

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addOption(state, action: PayloadAction<string>) {
      state.option = action.payload
    },
    addUsersClasses(state, action: PayloadAction<IClass[]>) {
      state.userClass = action.payload
    },
    replaceUsersClasses(state, action: PayloadAction<IClass[]>) {
      state.userClass = action.payload
      //setCookie('userClass', JSON.stringify(state.userClass));
    },
  },
})

export const menuActions = MenuSlice.actions
export default MenuSlice
