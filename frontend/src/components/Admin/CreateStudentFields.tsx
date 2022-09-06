import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import useInput from '../../hooks/useInput';
import { Fragment } from 'react';
import Modal from '../UI/Modal';
import { Status } from '../../interfaces/Status';
import { Role } from '../../interfaces/Role';
import LoadingSpinner from '../UI/LoadingSpinner';
import { memo } from 'react';
import useAxios from '../../hooks/use-axios';
import { fetchUsersData } from '../../store/usersActions';
import { useAppDispatch } from '../../hooks/use-redux';
import { FormControl } from '@mui/material';

type StudentProps = {
  email: string;
  resetInputs: () => void;
};

function CreateStudentFields(props: StudentProps) {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);

  const letters = /^[A-Za-z]+$/;
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(
    (value: string) =>
      value.trim() !== '' && value.length > 2 && letters.test(value),
  );
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(
    (value: string) =>
      value.trim() !== '' && value.length > 2 && letters.test(value),
  );

  const number = /^[0-9]+$/;
  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangedHandler,
    valueBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
  } = useInput(
    (value: string) =>
      value.trim() !== '' && value.length === 9 && number.test(value),
  );

  const generatePassword = (): string => {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = 12;
    let password = '';

    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  };

  const {
    error,
    loading: isLoading,
    sendData,
  } = useAxios({
    method: 'Post',
    url: 'auth/create',
    data: {
      email: props.email,
      password: generatePassword(),
      status: Status.Active,
      role: Role.Student,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      phone: enteredPhone,
    },
  });

  const validateForm: boolean =
    enteredFirstNameIsValid && enteredLastNameIsValid && enteredPhoneIsValid;

  const resetInputs = () => {
    resetFirstNameInput();
    resetLastNameInput();
    resetPhoneInput();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendData();
    setShowModal(true);
    resetInputs();
  };

  const handleCloseModal = () => {
    if (!error) {
      props.resetInputs();
      dispatch(fetchUsersData());
    }
    setShowModal(false);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || 'Student registered with success'}
          title={error ? 'error' : 'Success'}
        />
      )}
      <FormControl>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstName"
                required
                id="firstName"
                label="First Name"
                autoFocus
                error={firstNameInputHasError}
                value={enteredFirstName}
                onChange={firstNameChangedHandler}
                onBlur={firstNameBlurHandler}
                helperText={
                  firstNameInputHasError &&
                  enteredFirstName &&
                  'Please insert a valid name'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                error={lastNameInputHasError}
                value={enteredLastName}
                onChange={lastNameChangedHandler}
                onBlur={lastNameBlurHandler}
                helperText={
                  lastNameInputHasError &&
                  enteredLastName &&
                  'Please insert a valid  last name'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                error={phoneInputHasError}
                value={enteredPhone}
                onChange={phoneChangedHandler}
                onBlur={phoneBlurHandler}
                helperText={
                  phoneInputHasError &&
                  enteredPhone &&
                  'Please insert a valid phone number'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!validateForm}
              >
                Create Student
              </Button>
            </Grid>
          </Grid>
        </Box>
      </FormControl>
    </Fragment>
  );
}

export default memo(CreateStudentFields);
