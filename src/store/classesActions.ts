import { AxiosError } from 'axios';
import { AppDispatch } from '.';
import { Service } from '../services/Service';
import { classesActions } from './classes-slice';

export const fetchClassData = () => async (dispatch: AppDispatch) => {
  const fetchData = async () => {
    const response = await Service.getAllClasses();
    if (!response) {
      throw new Error('Could not fetch classes!');
    }
    return response;
  };
  try {
    const classData = await fetchData();
    dispatch(classesActions.replaceClasses(classData.data || []));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
};
