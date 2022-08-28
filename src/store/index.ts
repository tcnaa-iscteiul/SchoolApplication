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
    auth: AuthSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
