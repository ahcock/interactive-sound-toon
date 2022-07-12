import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
