import { UserService } from './user.service';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserUpdateDto } from './dto/UserUpdate.dto';
import { UserSearchDto } from './dto/UserSearch.dto';
import { User } from './user.schema';
export declare class UserController {
  private userService;
  constructor(userService: UserService);
  getAllUsers(param: UserSearchDto): Promise<User[]>;
  createUser(userCreateDto: UserCreateDto): Promise<void>;
  getUserById(id: string): Promise<User>;
  updateUser(userUpdateDto: UserUpdateDto): Promise<void>;
  deleteUser(param: UserUpdateDto): Promise<void>;
  getNrUsers(userUpdateDto: UserSearchDto): Promise<number>;
}
