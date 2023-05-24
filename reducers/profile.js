import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
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
    updateProfile: (state, action) => {
      for (let key in action.payload){
        state.value[key] = action.payload[key]
      }
    }
  },
});

export const { storeProfile, deleteProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
