import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { Fragment } from 'react';
import Modal from '../UI/Modal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { memo } from 'react';
import useAxios from '../../hooks/use-axios';
import { fetchUsersData } from '../../store/usersActions';
import { useAppDispatch } from '../../hooks/use-redux';
import CreateStudentFields from './CreateStudentFields';

function CreateStudent() {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFields, setShowFields] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value: string) => re.test(value) && value.length < 100);

  const {
    response,
    error,
    loading: isLoading,
    sendData,
  } = useAxios({
    method: 'Get',
    url: 'user/all',
    params: {
      email: enteredEmail,
    },
  });

  const validateForm: boolean = enteredEmailIsValid;

  const resetInputs = () => {
    resetEmailInput();
    setShowFields(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendData();
  };

  useEffect(() => {
    if (response?.data.length === 0 && response.statusText === 'OK') {
      setShowModal(false);
      setShowFields(true);
      setMessage('');
    } else if (response?.data.length !== 0 && response?.statusText === 'OK') {
      setShowModal(true);
      setMessage('Email already registered');
      resetEmailInput();
    } else {
      setShowModal(true);
      resetEmailInput();
    }
  }, [response, error]);

  const handleCloseModal = () => {
    if (!error) {
      dispatch(fetchUsersData());
    }
    setShowModal(false);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (error || message !== '') && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || message}
          title={'Error'}
        />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box display="flex">
          <Typography component="h1" variant="h5">
            Create Student
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled={showFields}
                  error={emailInputHasError}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={enteredEmail}
                  onChange={emailChangedHandler}
                  onBlur={emailBlurHandler}
                  helperText={
                    emailInputHasError &&
                    enteredEmail &&
                    'Please insert a valid email'
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={!validateForm || showFields}
                >
                  Search Student
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  onClick={() => {
                    setShowFields(false);
                  }}
                  variant="contained"
                  disabled={!showFields}
                >
                  Edit Email
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {showFields && (
          <CreateStudentFields email={enteredEmail} resetInputs={resetInputs} />
        )}
      </Container>
    </Fragment>
  );
}

export default memo(CreateStudent);
