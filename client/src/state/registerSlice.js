import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  userType: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    setUserType: (state, action) => {
      state.userType = action.payload.userType;
    },
  },
});

const selectSlice = (state) => state.register;

export const getInfoNull = createSelector([selectSlice], (selectSlice) => {
  return (
    selectSlice.firstName !== null &&
    selectSlice.lastName !== null &&
    selectSlice.email !== null
  );
});
export const { setInfo, setUserType } = registerSlice.actions;
export default registerSlice.reducer;
