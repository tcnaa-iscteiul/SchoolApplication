import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import './App.css';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import { Fragment } from 'react';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import PrivateRoutes from './PrivateRoutes';
import { Provider } from "react-redux";
import store from './store/index';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './components/ChangePassword';

enum Role {
    Student = "Student",
    Admin = "Admin",
    Teacher = "Teacher"
}

const theme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },
    },
});

function App() {

    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <Router>

                    <Provider store={store}>
                        <Routes>
                            {/* Public pages*/}
                            < Route element={<PrivateRoutes allowedRoles={Role.Teacher} />}>
                                <Route path='/teacher' element={<TeacherDashboard />} />
                            </Route>
                            < Route element={<PrivateRoutes allowedRoles={Role.Admin} />}>
                                <Route path='/admin' element={<AdminDashboard />} />
                            </Route>
                            < Route element={<PrivateRoutes allowedRoles={Role.Student} />}>
                                <Route path='/student' element={<StudentDashboard />} />
                            </Route>

                            {/* Public pages*/}
                            < Route path='/' element={<HomePage />} />
                            < Route path='/signin/*' element={<SignIn />} />
                            < Route path='/signup' element={<SignUp />} />
                            < Route path='/forgotPassword' element={<ForgotPassword />} />
                            < Route path='/changePassword' element={<ChangePassword />} />
                            {/* Catch all*/}
                            <Route path='/*' element={<Navigate to="/" />} />
                        </Routes>
                    </Provider>

                </Router>
            </ThemeProvider>
        </Fragment >
    );
}

export default App;
