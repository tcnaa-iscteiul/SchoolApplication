import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClass } from '../interfaces/IClass';

type MenuState = {
  option: string;
  userClass: IClass[];
};

const initialState: MenuState = {
  option: '',
  userClass: [],
};

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addOption(state, action: PayloadAction<string>) {
      state.option = action.payload;
    },
    replaceUsersClasses(state, action: PayloadAction<IClass[]>) {
      state.userClass = action.payload;
    },
  },
});

export const menuActions = MenuSlice.actions;
export default MenuSlice;
