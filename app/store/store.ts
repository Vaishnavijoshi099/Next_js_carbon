import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../reducers/formReducer'; // Import your form reducer

const store = configureStore({
  reducer: {
    form: formReducer, // Add your form reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;