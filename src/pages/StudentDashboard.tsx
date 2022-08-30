import Dashboard from '../components/UI/Dashboard';

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
  return <Dashboard options={studentDashboard} />;
};
export default StudentDashboard;
