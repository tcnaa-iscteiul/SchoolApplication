import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as LinkRouter } from 'react-router-dom';
import { useState } from 'react';
import useInput from '../hooks/useInput';
import PasswordStrengthBar from 'react-password-strength-bar';
import Modal from '../components/UI/Modal';
import { useSignUp } from '../hooks/useSignUp';
import { IUser } from '../interfaces';
import { Status } from '../interfaces/Status';
import { Role } from '../interfaces/Role';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Layout from '../components/UI/Layout';


export default function SignUp() {

    const { isLoading, error, signUp } = useSignUp();
    const [showModal, setShowModal] = useState<boolean>(false);
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangedHandler,
        valueBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput
    } = useInput((value: any) => value.trim() !== '' && value.length > 2 && isNaN(value));
    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangedHandler,
        valueBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput
    } = useInput((value: any) => value.trim() !== '' && value.length > 2 && isNaN(value));
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        valueBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput((value: any) => re.test(value));
    const {
        value: enteredPhone,
        isValid: enteredPhoneIsValid,
        hasError: phoneInputHasError,
        valueChangeHandler: phoneChangedHandler,
        valueBlurHandler: phoneBlurHandler,
        reset: resetPhoneInput
    } = useInput((value: any) => value.trim() !== '' && value.length === 9 && !isNaN(value)&&value.startsWith('9'));

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        valueBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput((value: any) => mediumRegex.test(value));
    const {
        value: enteredConfirmPassword,
        isValid: enteredConfirmaPasswordIsValid,
        hasError: confirmPasswordInputHasError,
        valueChangeHandler: confirmPasswordChangedHandler,
        valueBlurHandler: confirmPasswordBlurHandler,
        reset: resetConfirmPasswordInput
    } = useInput((value: any) => value === enteredPassword);


    const validateForm: boolean = enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid && enteredPhoneIsValid && enteredPasswordIsValid && enteredConfirmaPasswordIsValid;

    const resetInputs = () => {
        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
        resetPhoneInput();
        resetPasswordInput();
        resetConfirmPasswordInput();
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const newUser: IUser = {
            email: enteredEmail,
            password: enteredPassword,
            status: Status.Pending,
            role: Role.Teacher,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            phone: enteredPhone
        }
        signUp(newUser);
        resetInputs();
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <Layout>
            {isLoading && <LoadingSpinner />}
            {showModal && <Modal open={showModal} onClose={handleCloseModal} message={error || "Account created with success!"} title={error ? "error" : "Success"} />}
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
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
                                <Grid item xs={12}>
                                    <TextField
                                        error={passwordInputHasError}
                                        value={enteredPassword}
                                        onChange={passwordChangedHandler}
                                        helperText={(passwordInputHasError && enteredPassword && 'Please insert a valid password')}
                                        onBlur={passwordBlurHandler}
                                        margin="normal"
                                        required
                                        sx={{ width: 1 }}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password" />
                                    <PasswordStrengthBar password={enteredPassword} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        sx={{ width: 1 }}
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        error={confirmPasswordInputHasError}
                                        value={enteredConfirmPassword}
                                        onChange={confirmPasswordChangedHandler}
                                        helperText={(confirmPasswordInputHasError && !enteredConfirmPassword && 'The passwords does not match')}
                                        onBlur={confirmPasswordBlurHandler}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                            sx={{ mt: 3, mb: 2, width: 1 }}
                                variant="contained"
                                disabled={!validateForm}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <LinkRouter to="/signin">
                                        Already have an account? Sign in
                                    </LinkRouter>
                                </Grid>
                            </Grid>
                        </Box>
                </Box>
            </Container>
        </Layout>
    );
}
