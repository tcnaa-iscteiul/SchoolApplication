import Dashboard from "../components/UI/Dashboard";


const studentDashboard: lists[] = [
  {
    subheader: "Manage Account",
    list: ["Change Password"],
  },
  {
    subheader: "Classes",
    list: ["Class 1", "Class 2", "Class 3", "Class 4"],
  },
];


const StudentDashboard = () => {

  return <Dashboard options={studentDashboard} />;
};
export default StudentDashboard;
