import { configureStore } from '@reduxjs/toolkit';
import objectFormReducer from '@/features/object-management/slices/objectFormSlice';

export const store = configureStore({
  reducer: {
    objectForm: objectFormReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;