import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
        token: null,
        username: null,
        isProfileCreated: false
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
        },
        setProfile: (state, action) => {
            state.value.isProfileCreated = true
        },
        logout: (state) => {
            state.value.token = null;
            state.value.username = null;
        },
    },
});

export const { login, logout, setProfile } = userSlice.actions;
export default userSlice.reducer;