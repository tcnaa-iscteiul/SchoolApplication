import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import useInput from '../../hooks/useInput';
import { Fragment } from 'react';
import Modal from '../UI/Modal';
import { useSignUp } from '../../hooks/useSignUp';
import LoadingSpinner from '../UI/LoadingSpinner';
import { IClass } from '../../interfaces/IClass';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { memo } from 'react';
import { fetchClassData } from '../../store/classesActions';
import { useAppDispatch } from '../../hooks/use-redux';

function CreateClass() {
  const { isLoading, error, createClass } = useSignUp();
  const [showModal, setShowModal] = useState<boolean>(false);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const dispatch = useAppDispatch();
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  const [startDate, setStartDate] = useState<Date | undefined>(tomorrow);
  const [endDate, setEndDate] = useState<Date | undefined>(tomorrow);

  const letters = /^[A-Za-z]+$/;
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: NameInputHasError,
    valueChangeHandler: NameChangedHandler,
    valueBlurHandler: NameBlurHandler,
    reset: resetNameInput,
  } = useInput(
    (value: string) =>
      value.trim() !== '' && value.length > 2 && letters.test(value),
  );

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    valueBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value: string) => value.trim() !== '' && value.length > 10);

  const validateStartDate = startDate && startDate.getTime() <= today.getTime();

  const validateEndDate = !(
    endDate &&
    startDate &&
    endDate.getTime() >= startDate.getTime()
  );

  const validateForm: boolean =
    enteredNameIsValid &&
    enteredDescriptionIsValid &&
    !validateStartDate &&
    !validateEndDate;

  const resetInputs = () => {
    resetNameInput();
    resetDescriptionInput();
    setStartDate(tomorrow);
    setEndDate(tomorrow);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newClass: IClass = {
      name: enteredName,
      description: enteredDescription,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
    };
    createClass(newClass);
    dispatch(fetchClassData());
    resetInputs();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || 'Class created with success'}
          title={error ? 'error' : 'Success'}
        />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box display="flex">
          <Typography component="h1" variant="h5">
            Create Class
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Name"
                  required
                  id="Name"
                  label="Name"
                  autoFocus
                  error={NameInputHasError}
                  value={enteredName}
                  onChange={NameChangedHandler}
                  onBlur={NameBlurHandler}
                  helperText={
                    NameInputHasError &&
                    enteredName &&
                    'Please insert a valid name'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  label="Description"
                  name="description"
                  error={descriptionInputHasError}
                  value={enteredDescription}
                  onChange={descriptionChangedHandler}
                  onBlur={descriptionBlurHandler}
                  helperText={
                    descriptionInputHasError &&
                    enteredDescription &&
                    'Please insert a valid  description'
                  }
                />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12}>
                  <DesktopDatePicker
                    label="Start Date"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={(newValue: Date | null) => {
                      if (newValue) {
                        setStartDate(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        error={startDate && validateStartDate}
                        helperText={
                          startDate instanceof Date &&
                          !isNaN(startDate.getTime()) &&
                          validateStartDate &&
                          'It is not possible to create a class with the past date '
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DesktopDatePicker
                    label="End Date"
                    inputFormat="dd/MM/yyyy"
                    value={endDate}
                    onChange={(newValue: Date | null) => {
                      if (newValue) {
                        setEndDate(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        error={validateEndDate}
                        helperText={
                          endDate instanceof Date &&
                          !isNaN(endDate.getTime()) &&
                          endDate.toString() !== 'Invalid Data' &&
                          validateEndDate &&
                          'The end date must be greather than the start date!'
                        }
                      />
                    )}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={!validateForm}
                >
                  Create Class
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}

export default memo(CreateClass);
