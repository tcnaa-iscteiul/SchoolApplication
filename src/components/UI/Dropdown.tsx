import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IUser } from '../../interfaces/IUser';
import { IClass } from '../../interfaces/IClass';
import { useSelector } from 'react-redux';
import { Status } from '../../interfaces/Status';
import { Role } from '../../interfaces/Role';

type AllStudents = {
    students?: boolean,
    classes?: boolean,
    manageUser: (email: string) => void,
    teachers?: boolean,
    value:string
}
export default function Dropdown(props: AllStudents) {

    const users = useSelector((state: any) => state.students.students);
    const classes = useSelector((state: any) => state.classes.classes);

    const handleChange = (event: SelectChangeEvent) => {
        props.manageUser(event.target.value);
    };

    const menuItems: IUser[] = props.students ? users.filter((item: IUser) => item.role === Role.Student && item.status === Status.Active) :
        (props.teachers ? users.filter((item: IUser) => item.role === Role.Teacher && item.status === Status.Active) : []);
    const classItems: IClass[] = (props.classes && classes) || [];

    return (
        <FormControl sx={{ minWidth: 390 }}>
            <InputLabel id="demo-simple-select-helper-label">
                {(props.students && "Student") || (props.teachers && "Teachers") || (props.classes && "Classes")}
            </InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={props.value}
                label={"name"}
                onChange={handleChange}

            >
                {menuItems && menuItems.map((user,index:number) => (
                    <MenuItem key={ index } value={user.email}>
                        {user.firstName} {user.lastName}-{user.email}
                    </MenuItem>
                ))}
                {classItems && classItems.map((clas,index:number) => (
                    <MenuItem key={index} value={clas.name}>
                        {clas.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}