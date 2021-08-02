import { emptySplitApi } from ".";

export interface User {
    username: string;
}

export interface UserResponse {
    user: User;
    token: string;
}

export interface AuthRequest {
    username: string;
    password: string;
}

interface UserComplete {
    userId: number;
    username: string;
    postKarma: number;
}

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        signup: build.mutation<UserResponse, AuthRequest>({
            query: (requestBody) => ({
                url: "users/signup",
                method: "POST",
                body: requestBody,
            }),
            invalidatesTags: ["CurrentUser"],
        }),
        login: build.mutation<UserResponse, AuthRequest>({
            query: (requestBody) => ({
                url: "users/login",
                method: "POST",
                body: requestBody,
            }),
            invalidatesTags: ["CurrentUser"],
        }),
        getUserInfo: build.query<UserComplete, void>({
            query: () => `/users/info`,
            providesTags: ["CurrentUser"],
        }),
    }),
});

export const { useSignupMutation, useLoginMutation, useGetUserInfoQuery } =
    authApi;
