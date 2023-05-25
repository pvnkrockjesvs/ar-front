import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { },
  /*
    avatar: null,
    releaseTypes: [],
    artists: [],
    conflicts: [],
    user: null,
  },
  */
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    storeProfile: (state, action) => {
      state.value = action.payload
    },
    deleteProfile: (state) => {
      state.value = {}
    },
    updateConflicts: (state, action) => {
      state.value.conflicts = state.value.conflicts.filter(conflicts => conflicts !== action.payload)
    },
    updateProfile: (state, action) => {
      for(const prop in action.payload){
        state.value[prop] = action.payload[prop]
      }
    }
  },
});

export const { storeProfile, deleteProfile, updateConflicts, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
