import { IUser } from './IUser';

export interface IClass {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    teacher?: IUser;
    students?: IUser[];
    id?: string;
}