import { useEffect, memo } from 'react';
import Dashboard from '../components/UI/Dashboard';
import { useAppDispatch, useAppSelector } from '../hooks/use-redux';
import { fetchUserClassData } from '../store/menuActions';

const TeacherWelcomePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserClassData());
  }, [dispatch]);

  const teacherDashboard: lists[] = [
    {
      id: '1',
      subheader: 'Manage Account',
      list: ['Change Password'],
    },
    {
      id: '.2',
      subheader: 'Manage Classes',
      list: useAppSelector((state) => state.menu.userClass),
    },
  ];
  return <Dashboard options={teacherDashboard} />;
};
export default memo(TeacherWelcomePage);
