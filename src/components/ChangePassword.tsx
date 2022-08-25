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
import LoadingSpinner from './UI/LoadingSpinner';
import useAxios from '../hooks/use-axios';
import { getCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Service } from '../services/Service';
import { memo } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './styles/SignIn.css';

function ChangePassword() {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [showPassword, setShowPassord] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassord] = useState<boolean>(false);

    const navigate = useNavigate();

    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        valueBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput((value: string) => mediumRegex.test(value));

    const {
        value: enteredConfirmPassword,
        isValid: enteredConfirmaPasswordIsValid,
        hasError: confirmPasswordInputHasError,
        valueChangeHandler: confirmPasswordChangedHandler,
        valueBlurHandler: confirmPasswordBlurHandler,
        reset: resetConfirmPasswordInput
    } = useInput((value: string) => value === enteredPassword);

    const sampleLocation = useLocation();
    let token = getCookie("token");
    if (!token) {
        try {
            token = sampleLocation.search.split("=")[1];
        }
        catch (err) {
            throw new Error("Token not found!");
        }
    }

    const { response, error, loading: isLoading, sendData } = useAxios({
        method: "Patch",
        url: "auth/changePassword",
        data: {
            token: token,
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

    const handleCloseModal = async () => {
        setShowModal(false);
        if (sampleLocation.search && !error && !response?.data) {
            await Service.deleteToken(token!);
            navigate("/signin");
        }
    }

    const handleClickShowPassword = () => {
        setShowPassord(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassord(!showConfirmPassword);
    };

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {!isLoading && <Modal open={showModal} onClose={handleCloseModal} message={error || "Password updateded with success"} title={error ? "error" : "Success"} />}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box>
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    error={passwordInputHasError}
                                    value={enteredPassword}
                                    onChange={passwordChangedHandler}
                                    helperText={(passwordInputHasError && enteredPassword && 'Please insert a valid password')}
                                    onBlur={passwordBlurHandler}
                                    required
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    id="password"
                                    autoComplete="current-password"
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                />
                                <PasswordStrengthBar password={enteredPassword} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    error={confirmPasswordInputHasError}
                                    value={enteredConfirmPassword}
                                    onChange={confirmPasswordChangedHandler}
                                    helperText={(confirmPasswordInputHasError && !enteredConfirmPassword && 'The passwords does not match')}
                                    onBlur={confirmPasswordBlurHandler}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={!validateForm}
                                >
                                    Change Password
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Fragment >
    );
}

export default memo(ChangePassword);
