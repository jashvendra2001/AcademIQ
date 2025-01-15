import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  auth: false,
};

const authSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
      state.auth = true;
    },
    userLogOut: (state) => {
      state.user = null;
      state.auth = false;
    },
  },
});

export const { userLogin, userLogOut } = authSlice.actions; // Removed 'userDataStore'

export default authSlice.reducer;
