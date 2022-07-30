import { useCallback, useState } from 'react';
import { IUser } from '../interfaces/IUser';
import { IClass } from '../interfaces/IClass';
import { Service } from '../services/Service';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';
import { Status } from '../interfaces/Status';

export const useSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [users, setUsers] = useState<IUser[]>();

    const signUp = useCallback(async (user: IUser) => {
        setIsLoading(true);
        setError(undefined);
        try {
            const { status } = await Service.signUp(user);
            console.log(status);
            if (status !== 201) {
                throw new Error();
            }
        }
        catch (err: any) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    const createClass = useCallback(async (clas: IClass) => {
        setIsLoading(true);
        setError(undefined);
        try {
            const { status } = await Service.createClass(clas);

            if (status !== 201) {
                throw new Error();
            }
        }
        catch (err: any) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    const updateStudent = useCallback(async (clas: IUser) => {
        setIsLoading(true);
        setError(undefined);
        try {
            const { status } = await Service.updateUser(clas);
            if (status !== 200) {
                throw new Error();
            }
        }
        catch (err: any) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    const deleteStudent = useCallback(async (email: string) => {
        setIsLoading(true);
        setError(undefined);
        try {
            const { status } = await Service.deleteUser(email);
            console.log(status);
            if (status !== 200) {
                throw new Error();
            }
        }
        catch (err: any) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);


    const getAllUsers = useCallback(async () => {
        setIsLoading(true);
        setError(undefined);
        try {
            const { data, status } = await Service.getAllUsers();
            let users: IUser[] = [];
            data.map((item: IUser) => users.push(item));
            setUsers(users);
            if (status !== 201) {
                throw new Error();
            }


        }
        catch (err: any) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    const signIn = useCallback(async (user: IUser) => {
        setIsLoading(true);
        setError('');
        try {
            const { data, status } = await Service.signIn(user);
            navigate('/' + data.role);
            if (status !== 201) {
                throw new Error();
            }
            if (data.status === Status.Inactive) {
                throw new Error("Please contact the Admin!");
            }
            dispatch(authActions.login({ token: data.accessToken, role: data.role, status: data.status }));

        }
        catch (err: any) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [dispatch,navigate]);

    return {
        isLoading,
        error,
        signUp,
        getAllUsers,
        users,
        deleteStudent,
        createClass,
        updateStudent,
        signIn
    }
}
