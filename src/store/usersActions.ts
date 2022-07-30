import { Service } from '../services/Service';
import { studentsActions } from './redux-slice';

export const fetchUsersData = () => {
    return async (dispatch:any) => {
        const fetchData = async () => {
            const response = await Service.getAllUsers();

            if (!response) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response;

            return data;
        };

        try {
            const usersData = await fetchData();
            dispatch(
                studentsActions.replaceStudents({
                    students: usersData.data || [],
                })
            );
        } catch (error:any) {
            throw new Error(error.message);
        }
    };
};