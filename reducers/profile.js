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
    },
    deleteProfile: (state) => {
      state.value = {}
    },
    updateConflicts: (state, action) => {
      state.value.conflicts = state.value.conflicts.filter(conflicts => conflicts !== action.payload)
    },
  },
});

export const { storeProfile, deleteProfile, updateArtists, updateConflicts } = profileSlice.actions;
export default profileSlice.reducer;
