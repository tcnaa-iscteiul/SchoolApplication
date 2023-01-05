import { ILesson } from './ILesson'
import { IStudentLesson } from './IStudentLesson'
import { IUser } from './IUser'

type Evaluation = {
  date: string
  grade: number
}

export interface IClass {
  name: string
  description: string
  startDate: Date
  endDate: Date
  teacher?: IUser
  students: IUser[]
  id?: string
  studentId?: string
  lessons?: ILesson[]
  lessonsStudent?: IStudentLesson[]
  evaluations?: Evaluation
}
