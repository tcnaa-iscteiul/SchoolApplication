import { AxiosError, AxiosResponse } from 'axios';
import { Service } from '../services/Service';
import { replaceStudents } from './redux-slice';
import { AppDispatch } from '.';
import { IUser } from '../interfaces/IUser';

export const fetchUsersData = () => async (dispatch: AppDispatch) => {
  const fetchData = async (): Promise<AxiosResponse<IUser[]>> => {
    const response = await Service.getAllUsers();
    if (!response) {
      throw new Error('Could not fetch users!');
    }
    return response;
  };

  try {
    const { data } = await fetchData();
    dispatch(replaceStudents(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError<Error>) {
      if (error.response?.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
};
