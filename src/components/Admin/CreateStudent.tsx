import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import useInput from '../../hooks/useInput';
import { Fragment } from 'react';
import Modal from '../UI/Modal';
import { Status } from '../../interfaces/Status';
import { Role } from '../../interfaces/Role';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import useAxios from '../../hooks/use-axios';
import { fetchUsersData } from '../../store/usersActions';

function CreateStudent() {

    const dispatch:any = useDispatch();

    const [showModal, setShowModal] = useState<boolean>(false);

    const letters = /^[A-Za-z]+$/;
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangedHandler,
        valueBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput
    } = useInput((value: string) => value.trim() !== '' && value.length > 2 && letters.test(value));
    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangedHandler,
        valueBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput
    } = useInput((value: string) => value.trim() !== '' && value.length > 2 && letters.test(value));
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        valueBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput((value: string) => re.test(value));
    const number = /^[0-9]+$/;
    const {
        value: enteredPhone,
        isValid: enteredPhoneIsValid,
        hasError: phoneInputHasError,
        valueChangeHandler: phoneChangedHandler,
        valueBlurHandler: phoneBlurHandler,
        reset: resetPhoneInput
    } = useInput((value: string) => value.trim() !== '' && value.length === 9 && number.test(value));

    const generatePassword = ():string => {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const passwordLength = 12;
        let password = "";

        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        return password;
    }

    const { response, error, loading: isLoading, sendData } = useAxios({
        method: "Post",
        url: "auth/create",
        data: {
            email: enteredEmail,
            password: generatePassword(),
            status: Status.Active,
            role: Role.Student,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            phone: enteredPhone
        }
    });

    const validateForm: boolean = enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid && enteredPhoneIsValid;

    const resetInputs = () => {
        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
        resetPhoneInput();
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        sendData();
        setShowModal(true);
        resetInputs();
    }

    const handleCloseModal = () => {
        if (!error) {
            dispatch(fetchUsersData());
        }
        setShowModal(false);
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {showModal && <Modal open={showModal} onClose={handleCloseModal} message={error || "Student registered with success"} title={error?"error":"Success" } />}
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
                       Create Student
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    name="firstName"
                                    required
                                    sx={{ width: 1 }}
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={firstNameInputHasError}
                                    value={enteredFirstName}
                                    onChange={firstNameChangedHandler}
                                    onBlur={firstNameBlurHandler}
                                    helperText={(firstNameInputHasError && enteredFirstName && 'Please insert a valid name')}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    sx={{ width: 1 }}
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    error={lastNameInputHasError}
                                    value={enteredLastName}
                                    onChange={lastNameChangedHandler}
                                    onBlur={lastNameBlurHandler}
                                    helperText={lastNameInputHasError && enteredLastName && 'Please insert a valid  last name'}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    error={emailInputHasError}
                                    margin="normal"
                                    sx={{ width: 1 }}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={enteredEmail}
                                    onChange={emailChangedHandler}
                                    onBlur={emailBlurHandler}
                                    helperText={(emailInputHasError && enteredEmail && 'Please insert a valid email')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    sx={{ width: 1 }}
                                    id="phoneNumber"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    error={phoneInputHasError}
                                    value={enteredPhone}
                                    onChange={phoneChangedHandler}
                                    onBlur={phoneBlurHandler}
                                    helperText={(phoneInputHasError && enteredPhone && 'Please insert a valid phone number')}
                                />
                            </Grid>  
                        </Grid>
                        <Button
                            type="submit"
                            sx={{ mt: 3, mb: 2, width: 1 }}
                            variant="contained"
                            disabled={!validateForm}
                           
                        >
                            Create Student
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Fragment>
    );
}

export default memo(CreateStudent);
