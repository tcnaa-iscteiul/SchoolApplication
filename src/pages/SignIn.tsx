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
import { getCookie, setCookie } from 'typescript-cookie';

export default function SignIn() {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

    const signIn = useCallback(async (user: IUser) => {
        const token = getCookie("token");
        if (token) {
            navigate('/' + getCookie("role"));
        } else {
            setIsLoading(true);
            setError('');
            try {
                const { data, status } = await Service.signIn(user);
                navigate('/' + data.role);
                if (status !== 201) {
                    throw new Error();
                }
                dispatch(authActions.login({ token: data.accessToken, role: data.role, status: data.status }));
                //  const remainingTime = calculateRemainingTime(data);
                // setTimeout(logout, 216000000);
            }
            catch (err: any) {
                setError(err.message || 'Something went wrong!');
            }
            setIsLoading(false);
        }
    }, [dispatch, navigate]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser: IUser = {
            email: enteredEmail,
            password: enteredPassword
        }
        signIn(newUser);

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        <TextField
                            required
                            error={passwordInputHasError}
                            sx={{ width: 1 }}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={enteredPassword}
                            onChange={passwordChangedHandler}
                            onBlur={passwordBlurHandler}
                            helperText={(passwordInputHasError && enteredPassword && 'Please insert a valid password')}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: 1 }}
                            disabled={!enteredPasswordIsValid || !enteredEmailIsValid}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <LinkRouter to="/forgotPassword">
                                    Forgot password?
                                </LinkRouter>
                            </Grid>
                            <Grid item>
                                <LinkRouter to="/signup">
                                    {"Don't have an account? Sign Up"}
                                </LinkRouter>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}
