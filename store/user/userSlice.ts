import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const USER_INITIAL_STATE: IUserState = { email: null, isUserLoggedIn: false };

interface IUserState {
  email: string | null;
  isUserLoggedIn: boolean;
}

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    userLoggedIn(state, action: PayloadAction<IUserState>) {
      const { email, isUserLoggedIn } = action.payload;
      state.email = email;
      state.isUserLoggedIn = isUserLoggedIn;
    },

    userLoggedOut(state) {
      state.email = USER_INITIAL_STATE.email;
      state.isUserLoggedIn = USER_INITIAL_STATE.isUserLoggedIn;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;
export type { IUserState };
