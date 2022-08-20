import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import useInput from '../hooks/useInput';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Fragment } from 'react';
import Modal from './UI/Modal';
import { IUser } from '../interfaces';
import LoadingSpinner from './UI/LoadingSpinner';
import useAxios from '../hooks/use-axios';
import { getCookie } from 'typescript-cookie';

export default function ChangePassword() {

    const [showModal, setShowModal] = useState<boolean>(false);

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

    const { response, error, loading:isLoading, sendData } = useAxios({
        method: "Patch",
        url: "auth/changePassword",
        data: {
            token: getCookie("token"),
            password: enteredPassword
        }
    });

    const validateForm: boolean = enteredPasswordIsValid && enteredConfirmaPasswordIsValid;

    const resetInputs = () => {

       
        resetPasswordInput();
        resetConfirmPasswordInput();
    }



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        sendData();
        setShowModal(true);
        resetInputs();

    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {showModal && <Modal open={showModal} onClose={handleCloseModal} message={error || "Password updateded with success"} title={error ? "error" : "Success"} />}
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
                        Change Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
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
                            Change Password
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Fragment>
    );
}
