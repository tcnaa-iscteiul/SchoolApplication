import Dashboard from '../components/UI/Dashboard';

type lists = {
    subheader: string,
    list: string[]
}

const teacherDashboard: lists[] = [
    {
        subheader: "Manage Classes",
        list: ["Class 1", "Class 2", "Class 3", "Class 4"],
    }
];

const TeacherWelcomePage = () => {
    return <Dashboard options={teacherDashboard} />;
}
export default TeacherWelcomePage;