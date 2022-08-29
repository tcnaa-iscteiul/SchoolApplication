import Dropdown from '../UI/Dropdown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Service } from '../../services/Service';
import { useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import { memo } from 'react';
import { AxiosError } from 'axios';
import { Grid } from '@mui/material';

type AllStudents = {
  title: string;
  students?: boolean;
  teacher?: boolean;
  add?: boolean;
  remove?: boolean;
};

const AddRemoveUClass = (props: AllStudents): JSX.Element => {
  const [user, setUser] = useState<string>('');
  const [classes, setClasses] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      /*
      props.students &&
        props.add &&
        (await Service.assignStudentToClass(classes!, user!));
      props.students &&
        props.remove &&
        (await Service.removeStudentToClass(classes!, user!));
      props.teacher &&
        props.add &&
        (await Service.assignTeacherToClass(classes!, user!));
      props.teacher &&
        props.remove &&
        (await Service.removeTeacherToClass(classes!, user!));*/
      setUser('');
      setClasses('');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message);
        } else if (error.message) {
          setError(error.message);
        }
      } else {
        setError('Something went wrong!');
      }
    }
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <Modal
            open={showModal}
            onClose={handleCloseModal}
            message={
              error || props.add ? 'Added with success' : 'Removed with success'
            }
            title={error ? 'error' : 'Success'}
          />
        )}
        <CssBaseline />
        <Box display="flex">
          <Typography component="h1" variant="h5">
            {props.title}
          </Typography>
          <br />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {props.students && (
              <Dropdown
                students
                manageUser={(email: string) => {
                  setUser(email);
                }}
                value={user}
              />
            )}

            {props.teacher && (
              <Dropdown
                teachers
                manageUser={(email: string) => {
                  setUser(email);
                }}
                value={user}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Dropdown
              classes
              manageUser={(name: string) => {
                setClasses(name);
              }}
              value={classes}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={!(user && classes)}
              onClick={clickHandler}
            >
              {props.add ? 'Add' : 'Remove'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default memo(AddRemoveUClass);
