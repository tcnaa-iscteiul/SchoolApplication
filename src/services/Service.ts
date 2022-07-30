import  api  from './api';
import { IUser } from '../interfaces/IUser';
import { IClass } from '../interfaces/IClass';


const signIn = (user: Pick<IUser, 'email' | 'password'>) => api.post('/user/signin',user);
const signUp = (user: IUser) => api.post('/user', user);
const updateUser = (user: IUser) => api.patch('/user', user);
const deleteUser = (email: string) => api.delete('/user', { data: email });

const createClass = (clas: IClass) => api.post('/class', clas);


const getAllUsers = () => api.get('/user/all'); 
const getAllClasses = () => api.get('/class/all');

const assignStudentToClass = ( name: string, newStudents: string ) => api.patch('/class/student', { name, newStudents });
const removeStudentToClass = (name: string, newStudents: string) => api.patch('/class/removeStudent', { name, newStudents });

const assignTeacherToClass = (name: string, teacher: string) => api.patch('/class/assign', { name, teacher });
const removeTeacherToClass = (name: string, teacher: string) => api.patch('/class/remove', { name, teacher});

export const Service = {
    signIn,
    signUp,
    getAllUsers,
    getAllClasses,
    createClass,
    updateUser,
    deleteUser,
    assignStudentToClass,
    removeStudentToClass,
    assignTeacherToClass,
    removeTeacherToClass
}