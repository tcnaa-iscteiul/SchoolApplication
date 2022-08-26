import { Action, AnyAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Service } from '../services/Service';
import { replaceStudents } from './redux-slice';
import { AppDispatch } from '.';

export const fetchUsersData = () => {

    return async (dispatch: AppDispatch) => {
        const fetchData = async () => {

            const response = await Service.getAllUsers();
            if (!response) {
                throw new Error('Could not fetch users!');
            }
            return response;
        };

        try {
            const usersData = await fetchData();
            dispatch(
                replaceStudents({
                    students: usersData.data || [],
                }));
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(error.message);
                }

            }
        }
    };
};