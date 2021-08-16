import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { authApi, User } from "../../app/services/auth";

interface UserState extends User {
    karma?: number;
    id?: number;
}
interface AuthState {
    user: null | UserState;
    token: string | null;
    isAuthenticated: boolean;
    hasFetchLocalToken: boolean; // 是否已经从 localStorage 获取用户信息
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    hasFetchLocalToken: false,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState,
        setHasFetchLocalToken: (state) => {
            state.hasFetchLocalToken = true;
        },
        setUserStorage: (
            state,
            action: PayloadAction<{ user: { username: string }; token: string }>
        ) => {
            state.user = { username: action.payload.user.username };
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.signup.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = { username: payload.user.username, karma: 0 };
                state.isAuthenticated = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = { username: payload.user.username };
                state.isAuthenticated = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.getUserInfo.matchFulfilled,
            (state, { payload }) => {
                state.user!.karma = payload.postKarma;
                state.user!.id = payload.userId;
            }
        );
    },
});

export const { logout, setUserStorage, setHasFetchLocalToken } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
export const selectUsername = (state: RootState) => state.auth.user?.username;
export const selectKarma = (state: RootState) => state.auth.user?.karma;
export const selectUserId = (state: RootState) => state.auth.user?.id;
export const selectHasFetchLocalToken = (state: RootState) =>
    state.auth.hasFetchLocalToken;
