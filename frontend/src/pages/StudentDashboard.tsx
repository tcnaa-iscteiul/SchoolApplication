import { useCallback, useEffect } from 'react';
import Dashboard from '../components/UI/Dashboard';
import { useAppDispatch, useAppSelector } from '../hooks/use-redux';
import { IClass } from '../interfaces/IClass';
import { fetchUserClassData } from '../store/menuActions';

const studentDashboard: lists[] = [
  {
    id: '.1',
    subheader: 'Manage Account',
    list: ['Change Password'],
  },
  {
    id: '2',
    subheader: 'Classes',
    list: ['Class 1', 'Class 2', 'Class 3', 'Class 4'],
  },
];

const StudentDashboard = () => {
  const userClasses: IClass[] = useAppSelector((state) => state.menu.userClass);

  console.log(userClasses);
  const dispatch = useAppDispatch();
  const listClasses: string[] = [];
  useEffect(() => {
    dispatch(fetchUserClassData(useAppSelector((state) => state.menu.email)));
  }, [dispatch]);

  useCallback(() => {
    userClasses.forEach((element: IClass) => {
      listClasses.push(element.name);
    });
  }, [dispatch, userClasses]);

  console.log(listClasses);
  console.log(userClasses);

  return <Dashboard options={studentDashboard} />;
};
export default StudentDashboard;
