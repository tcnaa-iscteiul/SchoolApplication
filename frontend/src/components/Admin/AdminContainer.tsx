import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CreateStudent from './CreateStudent';
import CreateClass from './CreateClass';
import DisplayTable from './DisplayTable';
import UpdateStudent from './UpdateStudent';
import RemoveStudent from './RemoveStudent';
import { useCallback, useEffect, useState } from 'react';
import { IUser } from '../../interfaces/IUser';
import { Role } from '../../interfaces/Role';
import { Status } from '../../interfaces/Status';
import AddRemoveUClass from './AddRemoveUClass';
import { fetchUsersData } from '../../store/usersActions';
import { fetchClassData } from '../../store/classesActions';
import { Typography } from '@mui/material';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import ChangePassword from '../ChangePassword';
import { memo } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/use-redux';
import { AxiosError } from 'axios';
import { Service } from '../../services/Service';
import GridClasses from './GridClasses';
import UserInClass from './UserInClass';

function StudentContainer() {
  const dispatch = useAppDispatch();

  const [success, setSuccess] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const users = useAppSelector((state) => state.students.students);
  const option = useAppSelector((state) => state.menu.option);

  /* const {
        response,
        error,
        loading: isLoading,
        sendData,
    } = useAxios({
        method: "Patch",
        url: "user",
        data: {
            email: email,
            status: Status.Active,
        },
    });*/

  const approveRequest = useCallback(async (value: string) => {
    setLoading(true);
    await Service.updateUser({ email: value, status: Status.Active })
      .then((response) => {
        if (!response.statusText) {
          throw new Error('New Error');
        }
        dispatch(fetchUsersData());
        setSuccess('Teacher approved with success');
        setShowModal(true);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          setLoading(false);
          if (err.response?.data) {
            setError(err.response.data.message);
          } else if (err.message) {
            setError(err.message);
          }
        } else {
          setError('Something went wrong!');
        }
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    dispatch(fetchUsersData());
    dispatch(fetchClassData());
  }, [dispatch, approveRequest]);

  const allStudents = users.filter((user: IUser) => user.role === Role.Student);
  const teachers = users.filter((user: IUser) => user.role === Role.Teacher);
  const activeTeachers = teachers.filter(
    (user: IUser) => user.status === Status.Active,
  );
  const pendingTeachers = users.filter(
    (user: IUser) =>
      user.role === Role.Teacher && user.status === Status.Pending,
  );

  const disableTeacher = useCallback(async (value: string) => {
    setLoading(true);
    setShowModal(true);
    await Service.updateUser({ email: value, status: Status.Inactive })
      .then((response) => {
        if (!response.statusText) {
          throw new Error('New Error');
        }
        dispatch(fetchUsersData());
        setSuccess('Teacher disabled with success');
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          setLoading(false);
          if (err.response?.data) {
            setError(err.response.data.message);
          } else if (err.message) {
            setError(err.message);
          }
        } else {
          setError('Something went wrong!');
        }
      });
    setLoading(false);
  }, []);

  const components: JSX.Element[] = [
    <ChangePassword key={'Change Password'} />,
    <DisplayTable
      key={'All Students'}
      title={'All Students'}
      users={allStudents}
      approve={false}
      approveRequest={() => undefined}
      disableTeacher={() => undefined}
    />,
    <CreateStudent key={'Create Student'} />,
    <UpdateStudent key={'Update Student'} />,
    <RemoveStudent key={'Remove Student'} />,
    <DisplayTable
      key={'All Teachers'}
      title={'All Teachers'}
      users={teachers}
      approve={false}
      approveRequest={() => undefined}
      disableTeacher={() => undefined}
    />,
    <DisplayTable
      key={'Approve Request'}
      title={'Approve Teacher'}
      users={pendingTeachers}
      button={true}
      buttonTitle={'Confirm'}
      approveRequest={approveRequest}
      disableTeacher={() => undefined}
      approve={true}
    />,
    <DisplayTable
      key={'Disable Teacher'}
      title={'Disable Teacher'}
      users={activeTeachers}
      button={true}
      buttonTitle={'Disable'}
      approveRequest={() => undefined}
      disableTeacher={disableTeacher}
      approve={false}
    />,
    <GridClasses key={'All Classes'} />,
    <CreateClass key={'Create Class'} />,
    <AddRemoveUClass
      key={'Add/Remove Students'}
      students={true}
      title={'Add Students to Class '}
      add={true}
    />,
    <AddRemoveUClass
      key={'Add/Remove Students'}
      students={true}
      title={'Remove Students from Class '}
      remove={true}
    />,
    <AddRemoveUClass
      key={'Add/Remove Teachers'}
      teacher={true}
      title={'Add Teacher to Class '}
      add={true}
    />,
    <AddRemoveUClass
      key={'Add/Remove Teachers'}
      teacher={true}
      title={'Remove Teacher from Class '}
      remove={true}
    />,
    <UserInClass
      key={'Display Users in Class'}
      title={'Display Users in Class '}
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
            <Grid item key={index} xs={12}>
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
