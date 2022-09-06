import { AxiosError, AxiosResponse } from 'axios';
import { getCookie } from 'typescript-cookie';
import { AppDispatch } from '.';
import { Service } from '../services/Service';
import { menuActions } from './menu-slice';

export const fetchUserClassData = () => async (dispatch: AppDispatch) => {
  const fetchData = async (): Promise<AxiosResponse<string[]>> => {
    const token = getCookie('token');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = Service.getUserClassByToken(token!);
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
    dispatch(menuActions.replaceUsersClasses(classData.data));
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
