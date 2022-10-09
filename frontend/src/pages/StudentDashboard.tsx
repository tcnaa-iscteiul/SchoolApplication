import React, { memo, useEffect, Fragment } from 'react';
import Dashboard from '../components/UI/Dashboard';
import { useAppDispatch, useAppSelector } from '../hooks/use-redux';
import { fetchUserClassData } from '../store/menuActions';

const StudentDashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserClassData());
  }, [dispatch]);

  const userClasses = useAppSelector((state) => state.auth.userClasses) || [];
  const studentDashboard: lists[] = [
    {
      id: '.1',
      subheader: 'Manage Account',
      list: ['Change Password'],
    },
    {
      id: '.2',
      subheader: 'Classes',
      list: userClasses,
    },
  ];

  return (
    <Fragment>
      {userClasses && <Dashboard options={studentDashboard} />}
      {!userClasses && <p>Please check your connection!</p>}
    </Fragment>
  );
};
export default memo(StudentDashboard);
