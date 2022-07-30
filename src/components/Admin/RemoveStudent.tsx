import Dropdown from '../UI/Dropdown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useSignUp } from '../../hooks/useSignUp';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { studentsActions } from '../../store/redux-slice';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';


const RemoveStudent = (): JSX.Element => {
    const students = useSelector((state: any) => state.students.students);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [user, setUser] = useState<string>('');
    const dispatch = useDispatch();
    const { isLoading, error, deleteStudent } = useSignUp();

    const manageUser = (email: string) => {
        console.log(email);
        setUser(email);
    }

    const removeClickHandler = async(event:any) => {
        event.preventDefault();
        await deleteStudent(user);
        dispatch(studentsActions.removeUser(user));
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return <Fragment>
        {isLoading && <LoadingSpinner />}
        {showModal && <Modal open={showModal} onClose={handleCloseModal} message={error || "Student removed with success"} title={error ? "error" : "Success"} />}
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Remove Student
                </Typography>
                <br />
                <Dropdown students={students} manageUser={manageUser} value={user} />
                {user&&<Button
                    type="submit"
                    sx={{ mt: 3, mb: 2, width: 1 }}
                    variant="contained"
                    onClick={removeClickHandler }
                >
                    Remove
                </Button>}
            </Box>
        </Container>
        </Fragment>
}

export default RemoveStudent;