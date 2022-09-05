import { AxiosResponse } from 'axios';
import api from './api';
import { IUser } from '../interfaces/IUser';
import { IClass } from '../interfaces/IClass';

const signIn = (user: Pick<IUser, 'email' | 'password'>) =>
  api.post('auth', user);

const signUp = (user: IUser) => api.post('auth/create', user);
const updateUser = (user: IUser) => api.patch('user', user);
const deleteUser = (user: IUser) => api.delete('user', { data: user });

const createClass = (clas: IClass) => api.post('/class', clas);

const getAllUsers = (): Promise<AxiosResponse> => api.get('user/all');
const getAllClasses = () => api.get('class/all');

const getClassByUser = (user: IUser) => api.get('class', { data: user });

const deleteClass = (clas: IClass) => api.delete('class', { data: clas });

const updateClass = (clas: IClass) => api.patch('class', clas);

const assignStudentToClass = (name: string, newStudents: string) =>
  api.patch('/class/student', { name, newStudents });
const removeStudentToClass = (name: string, newStudents: string) =>
  api.patch('/class/removeStudent', { name, newStudents });

const assignTeacherToClass = (name: string, teacher: string) =>
  api.patch('/class/assign', { name, teacher });
const removeTeacherToClass = (name: string, teacher: string) =>
  api.patch('/class/remove', { name, teacher });

const deleteToken = (token: string) => api.delete('token', { data: token });

const forgotPassword = (email: string) =>
  api.post('auth/forgotPassword', email);

const refreshToken = (oldToken: string) => api.put('token/refresh', oldToken);

export const Service = {
  signIn,
  signUp,
  getAllUsers,
  getAllClasses,
  getClassByUser,
  createClass,
  deleteClass,
  updateClass,
  updateUser,
  deleteUser,
  assignStudentToClass,
  removeStudentToClass,
  assignTeacherToClass,
  removeTeacherToClass,
  deleteToken,
  forgotPassword,
  refreshToken,
};
