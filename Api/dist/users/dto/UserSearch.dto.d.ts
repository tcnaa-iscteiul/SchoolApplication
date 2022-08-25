export declare enum Role {
  Admin = 'Admin',
  Student = 'Student',
  Teacher = 'Teacher',
}
export declare enum Status {
  Active = 'Active',
  Pending = 'Pending',
  Inactive = 'Inactive',
}
export declare class UserSearchDto {
  id: string;
  email: string;
  password?: string;
  role?: Role;
  status?: Status;
  firstName?: string;
  lastName?: string;
  phone: string;
}
