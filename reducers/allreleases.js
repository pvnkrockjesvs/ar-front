import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { albums: [], eps: [] },
};

export const allreleasesSlice = createSlice({
  name: "allreleases",

  initialState,
  reducers: {
    addAlbums: (state, action) => {
      state.value.albums.push(action.payload);
    },
    addEps: (state, action) => {
      state.value.eps.push(action.payload);
    },
    removeAllAlbums: (state) => {
      state.value.albums = [];
      state.value.eps = [];
    },
  },
});

export const { addAlbums, removeAllAlbums, addEps } = allreleasesSlice.actions;
export default allreleasesSlice.reducer;
