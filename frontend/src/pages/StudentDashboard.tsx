import React, { memo, useEffect } from 'react';
import Dashboard from '../components/UI/Dashboard';
import { useAppDispatch, useAppSelector } from '../hooks/use-redux';
import { fetchUserClassData } from '../store/menuActions';

const StudentDashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserClassData());
  }, [dispatch]);

  const studentDashboard: lists[] = [
    {
      id: '.1',
      subheader: 'Manage Account',
      list: ['Change Password'],
    },
    {
      id: '.2',
      subheader: 'Classes',
      list: useAppSelector((state) => state.menu.userClass),
    },
  ];

  return <Dashboard options={studentDashboard} />;
};
export default memo(StudentDashboard);
