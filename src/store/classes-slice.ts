import { createSlice } from '@reduxjs/toolkit';
import { IClass } from '../interfaces/IClass';

const initialState: ClassesState = {
    classes: [],
}

const ClassesSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        replaceClasses(state, action) {
            state.classes = action.payload.classes;
        },
        addClass(state, action) {
            if (!state.classes.find((clas: IClass) => clas.id === action.payload.id)) {
                const newClass = {
                    id: action.payload.id,
                    name: action.payload.name,
                    description: action.payload.description,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                }
                state.classes.push(newClass);
                state.classes = state.classes.sort();
            }
        },
        removeClass(state, action) {
            state.classes = state.classes.filter((clas: IClass) => clas.id !== action.payload);
        },
    }
});

export const classesActions = ClassesSlice.actions;
export default ClassesSlice;