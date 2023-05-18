import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    storeProfile: (state, action) => {
      state.value.push(action.payload);
    },
    deleteProfile: (state) => {
      state.value = [];
    },
  },
});

export const { storeProfile, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;
