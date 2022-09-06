import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie, setCookie } from 'typescript-cookie';

type MenuState = {
  option: string;
  email: string;
  userClass: string[];
};
const user = getCookie('userClass') || '';
const cookieUser: string[] = user ? JSON.parse(user) : [];
const initialState: MenuState = {
  option: '',
  email: '',
  userClass: cookieUser,
};

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addOption(state, action: PayloadAction<string>) {
      state.option = action.payload;
    },
    addUsersClasses(state, action: PayloadAction<string[]>) {
      state.userClass = action.payload;
    },
    replaceUsersClasses(state, action: PayloadAction<string[]>) {
      state.userClass = action.payload;
      setCookie('userClass', JSON.stringify(state.userClass));
    },
  },
});

export const menuActions = MenuSlice.actions;
export default MenuSlice;
