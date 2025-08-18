import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/model/authSlice";
import workReducer from "@/features/work/model/workSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  work: workReducer,
});

export type RootState = ReturnType<typeof rootReducer>;