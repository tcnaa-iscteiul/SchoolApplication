import Dashboard from '../components/UI/Dashboard';

const teacherDashboard: lists[] = [
    {
        subheader: "Manage Account",
        list: ["Change Password",],
    },
    {
        subheader: "Manage Classes",
        list: ["Class 1", "Class 2", "Class 3", "Class 4"],
    }
];

const TeacherWelcomePage = () => {
    return <Dashboard options={teacherDashboard} />;
}
export default TeacherWelcomePage;