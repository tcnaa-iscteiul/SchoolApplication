import { createSlice } from "@reduxjs/toolkit";

const initialState: { option: string } = {
  option: "",
};

const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addOption(state, action) {
      state.option = action.payload.option;
    },
  },
});

export const menuActions = MenuSlice.actions;
export default MenuSlice;
