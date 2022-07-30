import Dashboard from '../components/UI/Dashboard';

type lists = {
    subheader: string,
    list: string[]
}

const adminDashboard: lists[] = [
    {
        subheader: "Manage Students",
        list: ["All Students", "Create Student", "Update Student", "Remove Student",],
    },
    {
        subheader: "Manage Teachers",
        list: ["All Teachers", "Approve Request", "Disable Teacher"],
    },
    {
        subheader: "Manage Classes",
        list: ["All Classes", "Create Class", "Add/Remove Students", "Add/Remove Teachers"]
    },
];


const AdminDashboard = () => {

    return <Dashboard options={adminDashboard}/>;
}
export default AdminDashboard;