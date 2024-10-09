import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,  // Store user information after login
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;  // Store the user data
        },
        logout: (state) => {
            state.user = null;  // Clear user data on logout
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
