import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
        token: null,
        username: null,
        email: null,
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
            state.value.email = action.payload.email
        },
        setProfile: (state, action) => {
            state.value.isProfileCreated = true
        },
        logout: (state, action) => {
            state.value.token = null;
            state.value.username = null;
            state.value.email = null;
            state.value.isProfileCreated = false
        },
    },
});

export const { login, logout, setProfile } = userSlice.actions;
export default userSlice.reducer;