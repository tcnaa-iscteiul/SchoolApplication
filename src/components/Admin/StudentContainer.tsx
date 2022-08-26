import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CreateStudent from '../Admin/CreateStudent';
import CreateClass from '../Admin/CreateClass';
import DisplayTable from '../Admin/DisplayTable';
import DisplayClasses from '../Admin/DisplayClasses';
import UpdateStudent from '../Admin/UpdateStudent';
import RemoveStudent from '../Admin/RemoveStudent';
import { useCallback, useEffect, useState } from 'react';
import { IUser } from '../../interfaces/IUser';
import { Role } from '../../interfaces/Role';
import { Status } from '../../interfaces/Status';
import AddRemoveUClass from './AddRemoveUClass';
import { fetchUsersData } from '../../store/usersActions';
import { fetchClassData } from '../../store/classesActions';
import { Typography } from '@mui/material';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import ChangePassword from '../ChangePassword';
import { memo } from 'react';
import useAxios from '../../hooks/use-axios';
import { studentsActions } from '../../store/redux-slice';
import { useAppSelector, useAppDispatch } from '../../hooks/use-redux';

function StudentContainer() {

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    const users = useAppSelector(state => state.students.students);
    const option = useAppSelector(state => state.menu.option);

    const { response, error, loading: isLoading, sendData } = useAxios({
        method: "Patch",
        url: "user",
        data: {
            email: email,
            status: Status.Active
        }
    });

    const approveRequest = React.useCallback((value: string) => {
        setEmail(value);
        sendData();
        setShowModal(true);
        dispatch(studentsActions.removeUser(email));
    }, [sendData]);


    useEffect(() => {
        dispatch(fetchUsersData());
        dispatch(fetchClassData());
    }, [dispatch, approveRequest]);

    const allStudents = users.filter((user: IUser) => user.role === Role.Student);
    const teachers = users.filter((user: IUser) => user.role === Role.Teacher);
    const activeTeachers = teachers.filter((user: IUser) => user.status === Status.Active);
    const pendingTeachers = users.filter((user: IUser) => user.role === Role.Teacher && user.status === Status.Pending);

    const disableTeacher = (value: string) => {

    }

    const components: JSX.Element[] = [
        <ChangePassword key={"Change Password"} />,
        <DisplayTable key={"All Students"} title={"All Students"} users={allStudents} approveRequest={() => { }} />,
        <CreateStudent key={"Create Student"} />,
        <UpdateStudent key={"Update Student"} />,
        <RemoveStudent key={"Remove Student"} />,
        <DisplayTable key={"All Teachers"} title={"All Teachers"} users={teachers} approveRequest={() => { }} />,
        <DisplayTable key={"Approve Request"} title={"Approve Teacher"} users={pendingTeachers} button={true} buttonTitle={"Confirm"} approveRequest={approveRequest} />,
        <DisplayTable key={"Disable Teacher"} title={"Disable Teacher"} users={activeTeachers} button={true} buttonTitle={"Disable"} approveRequest={disableTeacher} />,
        <DisplayClasses key={"All Classes"} />,
        <CreateClass key={"Create Class"} />,
        <AddRemoveUClass key={"Add/Remove Students"} students={true} title={"Add Students to Class "} add={true} />,
        <AddRemoveUClass key={"Add/Remove Students"} students={true} title={"Remove Students to Class "} remove={true} />,
        <AddRemoveUClass key={"Add/Remove Teachers"} teacher={true} title={"Add Teacher to Class "} add={true} />,
        <AddRemoveUClass key={"Add/Remove Teachers"} teacher={true} title={"Remove Teacher to Class "} remove={true} />
    ];

    const res = components.filter((item: JSX.Element) => item.key === option);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <Container maxWidth="lg">
            {isLoading && <LoadingSpinner />}
            {showModal && <Modal open={showModal} onClose={handleCloseModal} message={error || "Student removed with success"} title={error ? "error" : "Success"} />}
            <Grid container spacing={3}>
                {res && res.map((item, index: number) => (
                    <Grid item key={index} xs={12}>
                        <Paper elevation={2}>
                            {item}
                        </Paper>
                    </Grid>
                ))}
                {res.length === 0 &&
                    <Grid container spacing={3}>
                        <Grid item key={"welcome"} xs={12}>
                            <Paper elevation={1}>
                                <Typography
                                    component="h1"
                                    variant="h3"
                                    color="inherit"
                                    noWrap
                                >
                                    Welcome!
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>}
            </Grid>
        </Container >);
}

export default memo(StudentContainer);