import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../interfaces';

const initialState: { students: IUser[] } = {
    students: [],
}

const StudentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        replaceStudents(state, action) {
            state.students = action.payload.students;
        },
        addStudent(state, action) {
            console.log("add User");
            if (!state.students.find((student: IUser) => student.id === action.payload.id)) {
                const newStudent = {
                    id: action.payload.id,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    status: action.payload.status,
                    role: action.payload.role,
                }
                state.students.push(newStudent);
                state.students = state.students.sort();
            }
        },
        removeUser(state, action) {
            state.students = state.students.filter((student: IUser) => student.email !== action.payload);
        },
        updateUser(state, action) {
            const found = state.students.find((student: IUser) => (student === action.payload.user));

            if (found) {
                const updatedUser: IUser = {
                    id: found.id,
                    firstName: action.payload.user.fisrtName || found.firstName,
                    lastName: action.payload.user.lastName || found.lastName,
                    email: action.payload.user.email || found.email,
                    phone: action.payload.user.phone || found.phone
                }
                const index = state.students.findIndex((student: IUser) => (student === action.payload.user));
               state.students[index] = { ...updatedUser };
            }
        },
        getAllUsers: (state, action) => {
            state.students = [action.payload];
        },
    }
});

export const studentsActions = StudentsSlice.actions;
export default StudentsSlice;
