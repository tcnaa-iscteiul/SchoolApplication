import Dashboard from '../components/UI/Dashboard';

const teacherDashboard: lists[] = [
  {
    id: '1',
    subheader: 'Manage Account',
    list: ['Change Password'],
  },
  {
    id: '2',
    subheader: 'Manage Classes',
    list: ['Class 1', 'Class 2', 'Class 3', 'Class 4'],
  },
];

const TeacherWelcomePage = () => {
  return <Dashboard options={teacherDashboard} />;
};
export default TeacherWelcomePage;
