import { configureStore } from '@reduxjs/toolkit';
import ClassesSlice from './classes-slice';
import StudentsSlice from './redux-slice';
import MenuSlice from './menu-slice';
import AuthSlice from './auth-slice';


const store = configureStore({
    reducer: {
        students: StudentsSlice.reducer,
        classes: ClassesSlice.reducer,
        menu: MenuSlice.reducer,
        auth:AuthSlice.reducer
    }
});

export default store;