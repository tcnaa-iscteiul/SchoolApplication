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
import { useEffect } from 'react';
import { IUser } from '../../interfaces/IUser';
import { Role } from '../../interfaces/Role';
import { Status } from '../../interfaces/Status';
import AddRemoveUClass from './AddRemoveUClass';
import { useSignUp } from '../../hooks/useSignUp';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersData } from '../../store/usersActions';
import { fetchClassData } from '../../store/classesActions';
import { Typography } from '@mui/material';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import useAxios from '../../hooks/use-axios';
import ChangePassword from '../ChangePassword';
import { memo } from 'react';

 function StudentContainer() {

    const dispatch: Dispatch<any> = useDispatch();
    const users = useSelector((state: any) => state.students.students);
    
    const option = useSelector((state: any) => state.menu.option);

    const [showModal, setShowModal] = React.useState<boolean>(false);

    const { updateStudent } = useSignUp();

    const { response, error, loading, sendData } = useAxios({
        method: "Get",
        url: "user/all"
    });

    useEffect(() => {
        //sendData();
        dispatch(fetchUsersData());
        dispatch(fetchClassData());
    }, [dispatch]);

    
    useEffect(() => {
        if (users.changed) {
            dispatch(fetchUsersData());
        }

    }, [users, dispatch,sendData]);

    const allStudents = users.filter((user: IUser) => user.role === Role.Student);
    const teachers = users.filter((user: IUser) => user.role === Role.Teacher);
    const activeTeachers = teachers.filter((user: IUser) => user.status === Status.Active);
    const pendingTeachers = users.filter((user: IUser) => user.role === Role.Teacher && user.status === Status.Pending);


    const approveRequest = (value: string) => {
        updateStudent({ email: value, status: Status.Active });
    }

    const disableTeacher = (value: string) => {
        updateStudent({ email: value, status: Status.Inactive });
    }

    const components: JSX.Element[] = [
        <ChangePassword key={"Change Password" }/>,
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

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/*isLoading && <LoadingSpinner />*/}
            {/*showModal && <Modal open={showModal} onClose={handleCloseModal} message={error || "Student removed with success"} title={error ? "error" : "Success"} />*/}
            <Grid container spacing={3}>
                {res && res.map((item, index: number) => (
                    <Grid item key={index} xs={12}>
                        <Paper
                            sx={{
                                p: 6,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {item}
                        </Paper>
                    </Grid>
                ))}
                {res.length === 0 &&
                    <Grid container spacing={3}>
                        <Grid item key={"welcome"} xs={12}>
                            <Paper
                                sx={{
                                    p: 24,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
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