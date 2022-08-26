import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IUser } from "../../interfaces/IUser";
import { IClass } from "../../interfaces/IClass";
import { useSelector } from "react-redux";
import { Status } from "../../interfaces/Status";
import { Role } from "../../interfaces/Role";
import { memo } from "react";
import { useAppSelector } from "../../hooks/use-redux";

type AllStudents = {
  students?: boolean;
  classes?: boolean;
  manageUser: (email: string) => void;
  teachers?: boolean;
  value: string;
};

function Dropdown(props: AllStudents) {
  const users = useAppSelector((state) => state.students.students);
  const classes = useAppSelector((state) => state.classes.classes);

  const handleChange = (event: SelectChangeEvent) => {
    props.manageUser(event.target.value);
  };

  const menuItems: IUser[] = props.students
    ? users.filter(
        (item: IUser) =>
          item.role === Role.Student && item.status === Status.Active
      )
    : props.teachers
    ? users.filter(
        (item: IUser) =>
          item.role === Role.Teacher && item.status === Status.Active
      )
    : [];
  const classItems: IClass[] = (props.classes && classes) || [];

  return (
    <FormControl>
      <InputLabel>
        {(props.students && "Student") ||
          (props.teachers && "Teachers") ||
          (props.classes && "Classes")}
      </InputLabel>
      <Select
        fullWidth
        value={props.value}
        label={"name"}
        onChange={handleChange}
      >
        {menuItems &&
          menuItems.map((user, index: number) => (
            <MenuItem key={index} value={user.email}>
              {user.firstName} {user.lastName}-{user.email}
            </MenuItem>
          ))}
        {classItems &&
          classItems.map((clas, index: number) => (
            <MenuItem key={index} value={clas.name}>
              {clas.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default memo(Dropdown);
