import Dropdown from '../UI/Dropdown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import Button from '@mui/material/Button';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import { memo } from 'react';
import useAxios from '../../hooks/use-axios';
import { fetchUsersData } from '../../store/usersActions';
import { useAppDispatch } from '../../hooks/use-redux';

const RemoveStudent = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');

  const manageUser = (email: string) => {
    setUser(email);
  };

  const { error, loading, sendData } = useAxios({
    method: 'Delete',
    url: 'user',
    data: {
      email: user,
    },
  });

  const removeClickHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    sendData();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (!error) {
      dispatch(fetchUsersData());
    }
    setShowModal(false);
  };

  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      {!loading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || 'Student removed with success'}
          title={error ? 'error' : 'Success'}
        />
      )}

      <Container component="main" maxWidth="xs">
        <Box display="flex">
          <Typography component="h1" variant="h5">
            Remove Student
          </Typography>
          <CssBaseline />
        </Box>
        <Dropdown students manageUser={manageUser} value={user} />
        <br />
        {user && (
          <Button
            fullWidth
            type="submit"
            variant="contained"
            onClick={removeClickHandler}
          >
            Remove
          </Button>
        )}
      </Container>
    </Fragment>
  );
};

export default memo(RemoveStudent);
