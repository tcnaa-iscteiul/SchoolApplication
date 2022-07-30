import Dropdown from '../UI/Dropdown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Service } from '../../services/Service';
import { useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';


type AllStudents = {
    title: string,
    students?: boolean,
    teacher?: boolean,
    add?: boolean,
    remove?: boolean
}

const AddRemoveUClass = (props: AllStudents): JSX.Element => {
    const [user, setUser] = useState<string>('');
    const [classes, setClasses] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const clickHandler = async (event: any) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            props.students&&props.add&&await Service.assignStudentToClass(classes!, user!);
            props.students && props.remove && await Service.removeStudentToClass(classes!, user!);
            props.teacher && props.add && await Service.assignTeacherToClass(classes!, user!);
            props.teacher && props.remove && await Service.removeTeacherToClass(classes!, user!);
            setUser('');
            setClasses('');
        }
        catch (err: any) {
            setError(err.message);
            throw new Error(err.message);
        }
        setIsLoading(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return <Fragment>
        <Container component="main" maxWidth="xs">
            {isLoading && <LoadingSpinner />}
            {showModal && <Modal open={showModal} onClose={handleCloseModal} message={error || props.add?"Added with success":"Removed with success"} title={error ? "error" : "Success"} />}
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
                    {props.title}
                </Typography>
                <br />
                {props.students && <Dropdown students={props.students} manageUser={(email: string) => { setUser(email) }} value={user} />}
                {props.teacher && <Dropdown teachers={props.teacher} manageUser={(email: string) => { setUser(email) }} value={user} />}
                <br /><br />
                <Dropdown classes={true} manageUser={(name: string) => { setClasses(name) }} value={classes} />
                <Button type="submit"
                    sx={{ mt: 3, mb: 2, width: 1 }}
                    variant="contained"
                    disabled={!(user && classes)}
                    onClick={clickHandler}
                >{props.add ? "Add" : "Remove"}</Button>
            </Box>
        </Container>
    </Fragment>
}

export default AddRemoveUClass;

