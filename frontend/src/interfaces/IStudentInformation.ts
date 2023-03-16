import { IUser } from './IUser'

export interface StudentInformation {
  studentName: IUser
  presence: boolean
  absence: string
  submmitedClassWork?: string
}
