import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'
import useInput from '../hooks/useInput'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { IUser } from '../interfaces'
import Modal from '../components/UI/Modal'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Layout from '../components/UI/Layout'
import { Service } from '../services/Service'
import { useAppDispatch } from '../hooks/use-redux'
import { authActions } from '../store/auth-slice'
import { useNavigate } from 'react-router-dom'
import { getCookie } from 'typescript-cookie'
import { AxiosError } from 'axios'
import '../components/styles/SignIn.css'

export default function SignIn() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value: string) => re.test(value))
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value: string) => value.trim() !== '' && value.length >= 8)

  const signIn = useCallback(
    async (user: IUser) => {
      const token = getCookie('token')
      if (token) {
        navigate('/' + getCookie('role'))
      } else {
        setIsLoading(true)
        setError('')
        try {
          const { data, status } = await Service.signIn(user)
          navigate('/' + data.role)
          if (status !== 201) {
            throw new Error('New Error')
          }
          dispatch(
            authActions.login({
              token: data.accessToken,
              role: data.role,
              status: data.status,
              userClasses: data.userClass || '',
            }),
          )
          //  const remainingTime = calculateRemainingTime(data);
          // setTimeout(logout, 216000000);
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.data) {
              setError(error.response.data.message)
            } else if (error.message) {
              setError(error.message)
            }
          } else {
            setError('Something went wrong!')
          }
        }
        setIsLoading(false)
      }
    },
    [dispatch, navigate],
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newUser: IUser = {
      email: enteredEmail,
      password: enteredPassword,
    }
    signIn(newUser)

    resetEmailInput()
    resetPasswordInput()
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <Layout>
      {isLoading && <LoadingSpinner />}
      {showModal && error && (
        <Modal open={showModal} onClose={handleCloseModal} message={error} title={'error'} />
      )}
      <Container component="main" maxWidth="xs">
        <Box>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={emailInputHasError}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={enteredEmail}
                  onChange={emailChangedHandler}
                  onBlur={emailBlurHandler}
                  helperText={emailInputHasError && enteredEmail && 'Please insert a valid email'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={passwordInputHasError}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={enteredPassword}
                  onChange={passwordChangedHandler}
                  onBlur={passwordBlurHandler}
                  helperText={
                    passwordInputHasError && enteredPassword && 'Please insert a valid password'
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={!enteredPasswordIsValid || !enteredEmailIsValid}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotPassword">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}
