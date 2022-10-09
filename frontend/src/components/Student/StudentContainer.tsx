import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import ChangePassword from '../ChangePassword';
import { memo, useState } from 'react';
import { useAppSelector } from '../../hooks/use-redux';
import StudentTable from './StudentTable';

function StudentContainer() {
  const [success] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error] = useState<string>('');
  const [loading] = useState<boolean>(false);
  const listClasses = useAppSelector((state) => state.auth.userClasses);
  const option = useAppSelector((state) => state.menu.option);
  const components: JSX.Element[] = [
    <ChangePassword key={option === 'Change Password' ? option : null} />,
    <StudentTable
      key={listClasses?.find((item) => item === option) && option}
    />,
  ];

  const res = components.filter((item: JSX.Element) => item.key === option);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container maxWidth="lg">
      {loading && <LoadingSpinner />}
      {!loading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || success}
          title={error ? 'error' : 'Success'}
        />
      )}
      <Grid container spacing={3}>
        {res &&
          res.map((item, index: number) => (
            <Grid item key={item.key} xs={12}>
              <Paper elevation={2}>{item}</Paper>
            </Grid>
          ))}
        {res.length === 0 && (
          <Grid container spacing={3}>
            <Grid item key={'welcome'} xs={12}>
              <Paper elevation={1}>
                <Typography component="h1" variant="h3" color="inherit" noWrap>
                  Welcome!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default memo(StudentContainer);
