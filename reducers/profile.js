import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    avatar: null,
    releaseTypes: [],
    artists: [],
    conflicts: [],
    user: null,
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    storeProfile: (state, action) => {

      state.value = action.payload;
      console.log('THE PROFILE WAS CORRECTLY CREATED')
    },
    deleteProfile: (state) => {
      state.value = {}
    },
    updateConflicts: (state, action) => {
      state.value.conflicts = state.value.conflicts.filter(conflicts => conflicts !== action.payload)
    },
  },
});

export const { storeProfile, deleteProfile, updateConflicts } = profileSlice.actions;
export default profileSlice.reducer;
