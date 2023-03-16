import { AxiosError, AxiosResponse } from 'axios'
import { AppDispatch } from '.'
import { IClass } from '../interfaces/IClass'
import { Service } from '../services/Service'
import { classesActions } from './classes-slice'

export const fetchClassData = () => async (dispatch: AppDispatch) => {
  const fetchData = async (): Promise<AxiosResponse<IClass[]>> => {
    const response = await Service.getAllClasses()
    if (!response) {
      throw new Error('Could not fetch classes!')
    }
    return response
  }
  try {
    const classData = await fetchData()
    /* const transformedData:IClass[] = classData.data.map((item)=>{return {id:item.id, name:item.name, description:item.description, startDate:item.startDate, 
      endDate: item.endDate,
      students:item.students,
    teacher:item.teacher}});*/
    dispatch(classesActions.replaceClasses(classData.data || []))
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.data) {
        throw new Error(error.response.data.message)
      } else {
        throw new Error(error.message)
      }
    }
  }
}
