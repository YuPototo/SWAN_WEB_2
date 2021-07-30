import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface User {
    name: string;
    karma: number;
    id: number;
}

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
} as { user: null | User; token: string | null; isAuthenticated: boolean };

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState,
    },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
export const selectUsername = (state: RootState) => state.auth.user?.name;
export const selectKarma = (state: RootState) => state.auth.user?.karma;
