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
import { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IUser } from '../interfaces';
import Modal from '../components/UI/Modal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Layout from '../components/UI/Layout';
import { Service } from '../services/Service';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/use-axios';
import { getCookie } from 'typescript-cookie';

export default function ForgotPassword() {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const { isLoading, error, signIn } = useSignUp();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        valueBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput((value: any) => value.trim() !== '' && value.length >= 8);




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser: IUser = {
            email: enteredEmail,
            password: enteredPassword
        }

        resetEmailInput();
        resetPasswordInput();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <Layout>
            {isLoading && <LoadingSpinner />}
            {showModal && error && <Modal open={showModal} onClose={handleCloseModal} message={error} title={"error"} />}
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
                        Forgot Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography component="h1" variant="h6">
                            Please enter your email. You will receive a link to create a new password via email.
                        </Typography>
                        <TextField
                            required
                            error={emailInputHasError}
                            margin="normal"
                            sx={{ width: 1 }}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={enteredEmail}
                            onChange={emailChangedHandler}
                            onBlur={emailBlurHandler}
                            helperText={(emailInputHasError && enteredEmail && 'Please insert a valid email')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: 1 }}
                            disabled={!enteredPasswordIsValid || !enteredEmailIsValid}
                        >
                            Send Email
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <LinkRouter to="/signin">
                                    Remember password?
                                </LinkRouter>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}
