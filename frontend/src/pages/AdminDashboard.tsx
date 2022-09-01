import { Fragment } from 'react';
import Dashboard from '../components/UI/Dashboard';
import { useAppSelector } from '../hooks/use-redux';
import { Role } from '../interfaces/Role';
import { Status } from '../interfaces/Status';

const adminDashboard: lists[] = [
  {
    id: '1',
    subheader: 'Manage Account',
    list: ['Change Password'],
  },
  {
    id: '2',
    subheader: 'Manage Students',
    list: [
      'All Students',
      'Create Student',
      'Update Student',
      'Remove Student',
    ],
  },
  {
    id: '3',
    subheader: 'Manage Teachers',
    list: ['All Teachers', 'Approve Request', 'Disable Teacher'],
  },
  {
    id: '4',
    subheader: 'Manage Classes',
    list: [
      'All Classes',
      'Create Class',
      'Add/Remove Students',
      'Add/Remove Teachers',
      'Display Users in Class',
    ],
  },
];

const AdminDashboard = () => {
  return <Dashboard options={adminDashboard} />;
};
export default AdminDashboard;
