import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Fragment } from 'react';
import Modal from '../UI/Modal';
import { useSignUp } from '../../hooks/useSignUp';
import { IUser } from '../../interfaces';
import { Role } from '../../interfaces/Role';
import LoadingSpinner from '../UI/LoadingSpinner';
import Dropdown from '../UI/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { studentsActions } from '../../store/redux-slice';
import { memo } from 'react';

 function UpdateStudent() {
    const dispatch = useDispatch();
    const { isLoading, error, updateStudent } = useSignUp();
    const { students } = useSelector((state: any) => state.students);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [user, setUser] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateInput = (value: any) => {
        return (value.trim() !== '' && value.length > 2 && isNaN(value)) || value.trim() === '';
    }
    const validatePhone = (value: any) => {
        return (value.trim() !== '' && value.length === 9 && !isNaN(value)) || (value.trim() === '');
    }

    const validateForm: boolean = validateInput(firstName) && validateInput(lastName) && validatePhone(phone);
    const fieldNotEmpty = firstName.trim() !== '' || lastName.trim() !== '' || email.trim() !== '' || phone.trim() !== '';

    const resetInputs = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser: IUser = {
            email: user,
            firstName: firstName,
            lastName: lastName,
            phone: phone
        }
        const validatedUser = Object.fromEntries(
            Object.entries(newUser).filter(([_, v]) => v != null && v !== "")
        );
        await updateStudent(validatedUser);
        dispatch(studentsActions.updateUser(newUser));

        setShowModal(true);
        resetInputs();

    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const clickHandler = (name: string) => {
        setUser(name);
    }

    const allStudents = students.filter((user: IUser) => user.role === Role.Student);
    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {showModal && <Modal open={showModal} onClose={handleCloseModal} message={error || "Student updated with success"} title={error ? "error" : "Success"} />}
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Update Student
                    </Typography>
                    <br />
                    <CssBaseline />
                    <Grid item xs={12} >
                        <Dropdown students={allStudents} manageUser={clickHandler} value={user} />
                    </Grid>
                    {user && <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    name="firstName"
                                    sx={{ width: 1 }}
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={event => setFirstName(event.target.value)}
                                    value={firstName}
                                    error={!validateInput(firstName)}
                                    helperText={!validateInput(firstName) && 'Please insert a valid name'}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    sx={{ width: 1 }}
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    error={!validateInput(lastName)}
                                    onChange={event => setLastName(event.target.value)}
                                    value={lastName}
                                    helperText={!validateInput(lastName) && 'Please insert a valid last name'}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: 1 }}
                                    id="phoneNumber"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    error={!validatePhone(phone)}
                                    value={phone}
                                    onChange={event => setPhone(event.target.value)}
                                    helperText={!validatePhone(phone) && 'Please insert a valid phone number'}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    sx={{ width: 1 }}
                                    variant="contained"
                                    disabled={validateForm && !fieldNotEmpty}
                                >
                                    Update Student
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>}
                </Box>
            </Container>
        </Fragment>
    );
}

export default memo(UpdateStudent);
