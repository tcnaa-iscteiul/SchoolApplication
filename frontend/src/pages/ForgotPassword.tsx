import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link as LinkRouter } from 'react-router-dom'
import { useState } from 'react'
import useInput from '../hooks/useInput'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Modal from '../components/UI/Modal'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Layout from '../components/UI/Layout'
import useAxios from '../hooks/use-axios'
import '../components/styles/SignIn.css'

export default function ForgotPassword() {
  const [showModal, setShowModal] = useState<boolean>(false)

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
    error,
    loading: isLoading,
    sendData,
  } = useAxios({
    method: 'Post',
    url: 'auth/forgotPassword',
    data: {
      email: enteredEmail,
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendData()

    resetEmailInput()
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <Layout>
      {isLoading && <LoadingSpinner />}
      {showModal && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || 'Email sent successfully'}
          title={error ? 'error' : 'Success'}
        />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography component="h1" variant="h6">
              Please enter your email. You will receive a link to create a new password via email.
            </Typography>
            <TextField
              required
              error={emailInputHasError}
              margin="normal"
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
            <Button fullWidth type="submit" variant="contained" disabled={!enteredEmailIsValid}>
              Send Email
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkRouter to="/signin">Remember password?</LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}
