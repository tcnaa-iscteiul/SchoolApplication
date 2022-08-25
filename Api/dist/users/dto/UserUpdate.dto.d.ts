import { Role, Status } from '../dto/UserSearch.dto';
export declare class UserUpdateDto {
  id?: string;
  email?: string;
  password?: string;
  role?: Role;
  status?: Status;
  firstName?: string;
  lastName?: string;
  phone: string;
}
