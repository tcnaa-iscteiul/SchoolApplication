import { Role, Status } from './UserSearch.dto';
export declare class UserCreateDto {
    id: string;
    role: Role;
    status: Status;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}
