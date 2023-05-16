import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const albumsSlice = createSlice({
  name: "albums",

  initialState,
  reducers: {
    addAlbums: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addAlbums } = albumsSlice.actions;
export default albumsSlice.reducer;
