import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Fragment } from 'react';
import Modal from '../UI/Modal';
import LoadingSpinner from '../UI/LoadingSpinner';
import Dropdown from '../UI/Dropdown';
import { useAppDispatch } from '../../hooks/use-redux';
import useAxios from '../../hooks/use-axios';
import { fetchUsersData } from '../../store/usersActions';
import { memo } from 'react';

function UpdateStudent() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const letters = /^[A-Za-z]+$/;
  const validateInput = (value: string) => {
    return (
      (value.trim() !== '' && value.length > 2 && letters.test(value)) ||
      value.trim() === ''
    );
  };
  const number = /^[0-9]+$/;
  const validatePhone = (value: string) => {
    return (
      (value.trim() !== '' && value.length === 9 && number.test(value)) ||
      value.trim() === ''
    );
  };

  const validateForm: boolean =
    validateInput(firstName) && validateInput(lastName) && validatePhone(phone);
  const fieldNotEmpty =
    firstName.trim() !== '' ||
    lastName.trim() !== '' ||
    email.trim() !== '' ||
    phone.trim() !== '';

  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
  };

  const { name, surname, telephone } = Object.fromEntries(
    Object.entries({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    }).filter(([v]) => v != null && v !== ''),
  );

  const {
    error,
    loading: isLoading,
    sendData,
  } = useAxios({
    method: 'Patch',
    url: 'user',
    data: {
      email: user,
      firstName: firstName || name,
      lastName: lastName || surname,
      phone: phone || telephone,
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendData();
    setShowModal(true);
    resetInputs();
  };

  const handleCloseModal = () => {
    if (!error) {
      dispatch(fetchUsersData());
    }
    setShowModal(false);
  };

  const clickHandler = (name: string) => {
    setUser(name);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || 'Student updated with success'}
          title={error ? 'error' : 'Success'}
        />
      )}

      <Container component="main" maxWidth="xs">
        <Box display="flex">
          <Typography component="h1" variant="h5">
            Update Student
          </Typography>
          <CssBaseline />
        </Box>
        <Dropdown students manageUser={clickHandler} value={user} />

        {user && (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                  error={!validateInput(firstName)}
                  helperText={
                    !validateInput(firstName) && 'Please insert a valid name'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  error={!validateInput(lastName)}
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                  helperText={
                    !validateInput(lastName) &&
                    'Please insert a valid last name'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  error={!validatePhone(phone)}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  helperText={
                    !validatePhone(phone) &&
                    'Please insert a valid phone number'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={validateForm && !fieldNotEmpty}
                >
                  Update Student
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Fragment>
  );
}

export default memo(UpdateStudent);
