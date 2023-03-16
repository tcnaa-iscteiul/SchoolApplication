import { AxiosError, AxiosResponse } from 'axios'
import { getCookie } from 'typescript-cookie'
import { AppDispatch } from '.'
import { IClass } from '../interfaces/IClass'
import { Service } from '../services/Service'
import { menuActions } from './menu-slice'

export const fetchUserClassData = () => async (dispatch: AppDispatch) => {
  const fetchData = async (): Promise<AxiosResponse<IClass[]>> => {
    const token = getCookie('token')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = Service.getUserClassByToken(token!)
    if (!response) {
      throw new Error('Could not fetch  user classes!')
    }
    console.log(response)
    return response
  }
  try {
    const classData = await fetchData()
    dispatch(menuActions.replaceUsersClasses(classData.data))
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
