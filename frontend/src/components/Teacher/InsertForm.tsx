import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import useAxios from '../../hooks/use-axios';
import { useAppSelector } from '../../hooks/use-redux';
import useInput from '../../hooks/useInput';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';

type InsertFormProps = {
  title: string;
  method: string;
  url: string;
};

function InsertForm(props: InsertFormProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    value: enteredSummary,
    isValid: enteredSummaryIsValid,
    hasError: summaryInputHasError,
    valueChangeHandler: summaryChangedHandler,
    valueBlurHandler: summaryBlurHandler,
    reset: resetSummaryInput,
  } = useInput((value: string) => value !== '');

  const axiosParams = {
    method: props.method,
    url: props.url,
    data: {
      summary: enteredSummary,
      className: useAppSelector((state) => state.menu.option),
    },
  };

  const { error, loading, sendData } = useAxios(axiosParams);
  const clickHandlerInsert = (event: React.MouseEvent) => {
    event.preventDefault();
    sendData();
    setShowModal(true);
    resetSummaryInput();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      {!loading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || 'Summary inserted with success!'}
          title={error ? 'error' : 'success'}
        />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box>
          <Typography component="h1" variant="h5">
            {props.title}
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  value={enteredSummary}
                  onChange={summaryChangedHandler}
                  multiline
                  onBlur={summaryBlurHandler}
                  error={summaryInputHasError}
                  minRows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={clickHandlerInsert}
                  disabled={!enteredSummaryIsValid}
                  style={{ width: '100%' }}
                >
                  {props.title}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}

export default InsertForm;
