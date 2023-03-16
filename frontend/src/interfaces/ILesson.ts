import { IUser } from './IUser'

type StudentInformation = {
  studentName: IUser
  presence: boolean
  absence: string
  submmitedClassWork?: string
}

export interface ILesson {
  id: string
  className: string
  summary: string
  date?: Date
  classWork?: string
  students: StudentInformation[]
}
