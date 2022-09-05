import { AxiosError, AxiosResponse } from 'axios';
import { AppDispatch } from '.';
import { useAppSelector } from '../hooks/use-redux';
import { IClass } from '../interfaces/IClass';
import { Service } from '../services/Service';
import MenuSlice, { menuActions } from './menu-slice';

export const fetchUserClassData =
  (email: string) => async (dispatch: AppDispatch) => {
    const fetchData = async (): Promise<AxiosResponse<IClass[]>> => {
      const response = await Service.getClassByUser({ email: email });
      console.log(response);
      if (!response) {
        throw new Error('Could not fetch  user classes!');
      }
      return response;
    };
    try {
      const classData = await fetchData();
      /* const transformedData:IClass[] = classData.data.map((item)=>{return {id:item.id, name:item.name, description:item.description, startDate:item.startDate, 
      endDate: item.endDate,
      students:item.students,
    teacher:item.teacher}});*/
      dispatch(menuActions.replaceUsersClasses(classData.data || []));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error(error.message);
        }
      }
    }
  };
