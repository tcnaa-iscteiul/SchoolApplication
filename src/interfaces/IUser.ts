import { Role } from './Role';
import { Status } from './Status';

export interface IUser {
    id?: string;
    email?: string;
    password?: string;
    status?: Status;
    role?: Role;
    firstName?: string;
    lastName?: string;
    phone?: string;
}