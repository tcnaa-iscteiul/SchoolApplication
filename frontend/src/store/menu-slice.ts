import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MenuState = {
  option: string;
};

const initialState: MenuState = {
  option: '',
};

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addOption(state, action: PayloadAction<string>) {
      state.option = action.payload;
    },
  },
});

export const menuActions = MenuSlice.actions;
export default MenuSlice;
