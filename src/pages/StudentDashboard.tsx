import Dashboard from '../components/UI/Dashboard';

type lists = {
    subheader: string,
    list: string[]
}

const studentDashboard: lists[] = [
    {
        subheader: "Classes",
        list: ["Class 1", "Class 2", "Class 3", "Class 4"],
    },
];

const StudentDashboard = () => {

    return <Dashboard options={studentDashboard} />;
}
export default StudentDashboard;