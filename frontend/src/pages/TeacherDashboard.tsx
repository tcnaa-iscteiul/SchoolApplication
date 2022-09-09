import { memo, Fragment } from 'react';
import Dashboard from '../components/UI/Dashboard';
import { useAppSelector } from '../hooks/use-redux';

const TeacherWelcomePage = () => {
  const menuList: string[] = useAppSelector((state) => state.menu.userClass);

  const teacherDashboard: lists[] = [
    {
      id: '1',
      subheader: 'Manage Account',
      list: ['Change Password'],
    },
    {
      id: '.2',
      subheader: 'Manage Classes',
      list: ['Php', 'Biologia'],
    },
  ];

  return (
    <Fragment>{menuList && <Dashboard options={teacherDashboard} />}</Fragment>
  );
};
export default memo(TeacherWelcomePage);
