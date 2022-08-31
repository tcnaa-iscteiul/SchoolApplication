import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IUser } from '../../interfaces/IUser';
import { IClass } from '../../interfaces/IClass';
import { Status } from '../../interfaces/Status';
import { Role } from '../../interfaces/Role';
import { memo } from 'react';
import { useAppSelector } from '../../hooks/use-redux';

type AllStudents = {
  students?: boolean;
  classes?: IClass[];
  manageUser: (email: string) => void;
  teachers?: boolean;
  value: string;
};

const MenuProps = {
  PaperProps: {
    style: {
      padding: 1,
      width: 1,
    },
  },
};

function Dropdown(props: AllStudents) {
  const users = useAppSelector((state) => state.students.students);

  const handleChange = (event: SelectChangeEvent) => {
    props.manageUser(event.target.value);
  };

  const menuItems: IUser[] = props.students
    ? users.filter(
        (item: IUser) =>
          item.role === Role.Student && item.status === Status.Active,
      )
    : props.teachers
    ? users.filter(
        (item: IUser) =>
          item.role === Role.Teacher && item.status === Status.Active,
      )
    : [];
  const classItems: IClass[] = (props.classes && props.classes) || [];
  return (
    <FormControl>
      <InputLabel>
        {(props.students && 'Student') ||
          (props.teachers && 'Teachers') ||
          (props.classes && 'Classes')}
      </InputLabel>
      <Select
        fullWidth
        value={props.value}
        label={'name'}
        onChange={handleChange}
        MenuProps={MenuProps}
      >
        {menuItems &&
          menuItems.map((user) => (
            <MenuItem key={user.id} value={user.email}>
              {user.firstName} {user.lastName}-{user.email}
            </MenuItem>
          ))}
        {classItems &&
          classItems.map((clas) => (
            <MenuItem key={clas.id} value={clas.name}>
              {clas.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default memo(Dropdown);
