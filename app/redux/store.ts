import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice'; // Import the form slice

const store = configureStore({
  reducer: {
    form: formReducer, // Add the form reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;