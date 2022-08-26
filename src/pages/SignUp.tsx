import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as LinkRouter } from "react-router-dom";
import { useState } from "react";
import useInput from "../hooks/useInput";
import PasswordStrengthBar from "react-password-strength-bar";
import Modal from "../components/UI/Modal";
import { Status } from "../interfaces/Status";
import { Role } from "../interfaces/Role";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Layout from "../components/UI/Layout";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAxios from "../hooks/use-axios";
import "../components/styles/SignIn.css";

export default function SignUp() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPassword, setShowPassord] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassord] = useState<boolean>(false);

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
      value.trim() !== "" && value.length > 1 && letters.test(value)
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
      value.trim() !== "" && value.length > 2 && letters.test(value)
  );
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value: string) => re.test(value));
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
      value.trim() !== "" &&
      value.length === 9 &&
      number.test(value) &&
      value.startsWith("9")
  );

  const mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value: string) => mediumRegex.test(value));
  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmaPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangedHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value: string) => value === enteredPassword);

  const {
    response,
    error,
    loading: isLoading,
    sendData,
  } = useAxios({
    method: "Post",
    url: "auth/create",
    data: {
      email: enteredEmail,
      password: enteredPassword,
      status: Status.Pending,
      role: Role.Teacher,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      phone: enteredPhone,
    },
  });

  const validateForm: boolean =
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmaPasswordIsValid;

  const resetInputs = () => {
    setShowModal(true);
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetPhoneInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendData();
    resetInputs();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickShowPassword = () => {
    setShowPassord(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassord(!showConfirmPassword);
  };

  return (
    <Layout>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || "Account created with success!"}
          title={error ? "error" : "Success"}
        />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
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
                    "Please insert a valid name"
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
                    "Please insert a valid  last name"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={emailInputHasError}
                  margin="normal"
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
                    "Please insert a valid email"
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
                    "Please insert a valid phone number"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordInputHasError}
                  value={enteredPassword}
                  onChange={passwordChangedHandler}
                  helperText={
                    passwordInputHasError &&
                    enteredPassword &&
                    "Please insert a valid password"
                  }
                  onBlur={passwordBlurHandler}
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <PasswordStrengthBar password={enteredPassword} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  error={confirmPasswordInputHasError}
                  value={enteredConfirmPassword}
                  onChange={confirmPasswordChangedHandler}
                  helperText={
                    confirmPasswordInputHasError &&
                    !enteredConfirmPassword &&
                    "The passwords does not match"
                  }
                  onBlur={confirmPasswordBlurHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
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
                  Sign Up
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkRouter to="/signin">
                  Already have an account? Sign in
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
