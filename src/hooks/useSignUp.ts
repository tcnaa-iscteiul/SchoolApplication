import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { AxiosError } from 'axios';
import { IUser } from '../interfaces/IUser';
import * as IClass from '../interfaces/IClass';
import { Service } from '../services/Service';
import { authActions } from '../store/auth-slice';

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
      if (status !== 201) {
        setError('Something went wrong!');
        throw new Error();
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError<Error, Response>) {
        if (err.response?.data) {
          setError(err.response.data.message);
        } else if (err.message) {
          setError(err.message);
        }
      } else {
        setError('Something went wrong!');
      }
    }
    setIsLoading(false);
  }, []);

  const createClass = useCallback(async (clas: IClass.IClass) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const { status } = await Service.createClass(clas);

      if (status !== 201) {
        throw new Error();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message);
        } else if (error.message) {
          setError(error.message);
        }
      } else {
        setError('Something went wrong!');
      }
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
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message);
        } else if (error.message) {
          setError(error.message);
        }
      } else {
        setError('Something went wrong!');
      }
    }
    setIsLoading(false);
  }, []);

  const deleteStudent = useCallback(async (user: IUser) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const { status } = await Service.deleteUser(user);
      if (status !== 200) {
        throw new Error();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message);
        } else if (error.message) {
          setError(error.message);
        }
      } else {
        setError('Something went wrong!');
      }
    }
    setIsLoading(false);
  }, []);

  const getAllUsers = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const { data, status } = await Service.getAllUsers();
      const users: IUser[] = [];
      data.map((item: IUser) => users.push(item));
      setUsers(users);
      if (status !== 201) {
        throw new Error();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message);
        } else if (error.message) {
          setError(error.message);
        }
      } else {
        setError('Something went wrong!');
      }
    }
    setIsLoading(false);
  }, []);

  const calculateRemainingTime = (expirationTime: string) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingTime = adjExpirationTime - currentTime;

    return remainingTime;
  };

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = getCookie('token');
      const { status } = await Service.deleteToken(token!);
      navigate('/');
      dispatch(authActions.logout());
      if (status !== 201) {
        throw new Error();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message);
        } else if (error.message) {
          setError(error.message);
        }
      } else {
        setError('Something went wrong!');
      }
    }
    setIsLoading(false);
  }, [dispatch, navigate]);
  /*
    const signIn = useCallback(async (user: IUser) => {
        setIsLoading(true);
        setError('');
        try {
            const { data, status } = await Service.signIn(user);
            console.log(data);
            navigate('/' + data.role);
            if (status !== 201) {
                throw new Error();
            }
            dispatch(authActions.login({ token: data.accessToken,
              role: data.role, status: data.status }));
            const remainingTime = calculateRemainingTime(data);
           // setTimeout(logout, 216000000);
        }
        catch (err: any) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [dispatch, navigate, logout]);
    */
  return {
    isLoading,
    error,
    signUp,
    getAllUsers,
    users,
    deleteStudent,
    createClass,
    updateStudent,
    // signIn,
    logout,
  };
};
