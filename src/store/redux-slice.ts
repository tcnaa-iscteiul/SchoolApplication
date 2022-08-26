import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces";

interface CounterState {
  students: IUser[];
}

const initialState: CounterState = {
  students: [],
};

const StudentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    replaceStudents(state, action) {
      state.students = action.payload.students;
    },
    addStudent(state, action) {
      if (
        !state.students.find(
          (student: IUser) => student.email === action.payload.email
        )
      ) {
        const newStudent = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          status: action.payload.status,
          role: action.payload.role,
          phone: action.payload.phone,
        };
        state.students.push(newStudent);
        state.students = state.students.sort();
      }
    },
    removeUser(state, action) {
      state.students = state.students.filter(
        (student: IUser) => student.email !== action.payload
      );
    },
    updateUser(state, action) {
      const found = state.students.filter(
        (student: IUser) => student.email === action.payload.email
      );
      if (found[0]) {
        const updatedUser: IUser = {
          id: found[0].id,
          firstName: action.payload.firstName || found[0].firstName,
          lastName: action.payload.lastName || found[0].lastName,
          email: action.payload.email || found[0].email,
          phone: action.payload.phone || found[0].phone,
        };
        const index = state.students.findIndex(
          (student: IUser) => student.email === action.payload.email
        );
        state.students[index] = { ...updatedUser };
      }
    },
    getAllUsers: (state, action) => {
      state.students = [action.payload.students];
    },
  },
});

export const studentsActions = StudentsSlice.actions;
export const {
  replaceStudents,
  addStudent,
  removeUser,
  updateUser,
  getAllUsers,
} = StudentsSlice.actions;
export default StudentsSlice;
