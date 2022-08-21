import { Service } from '../services/Service';
import { classesActions } from './classes-slice';

export const fetchClassData = () => {
    return async (dispatch: any) => {
        const fetchData = async () => {
            const response = await Service.getAllClasses();
            if (!response) {
                throw new Error('Could not fetch classes!');
            }
            const data = await response;

            return data;
        };

        try {
            const classData = await fetchData();
            dispatch(
                classesActions.replaceClasses({
                    classes: classData.data || [],
                })
            );
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
};