import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClass } from '../interfaces/IClass';

const initialState: ClassesState = {
  classes: [],
};

const ClassesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    replaceClasses(state, action: PayloadAction<IClass[]>) {
      state.classes = action.payload;
    },
    addClass(state, action: PayloadAction<IClass>) {
      if (
        !state.classes.find((clas: IClass) => clas.id === action.payload.id)
      ) {
        const newClass = {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          students: action.payload.students,
        };
        state.classes.push(newClass);
        state.classes = state.classes.sort();
      }
    },
    removeClass(state, action: PayloadAction<string>) {
      state.classes = state.classes.filter(
        (clas: IClass) => clas.id !== action.payload,
      );
    },
  },
});

export const classesActions = ClassesSlice.actions;
export default ClassesSlice;
