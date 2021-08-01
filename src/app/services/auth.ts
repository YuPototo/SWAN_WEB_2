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

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        signup: build.mutation<UserResponse, AuthRequest>({
            query: (requestBody) => ({
                url: "users/signup",
                method: "POST",
                body: requestBody,
            }),
            invalidatesTags: ["User"],
        }),
        login: build.mutation<UserResponse, AuthRequest>({
            query: (requestBody) => ({
                url: "users/login",
                method: "POST",
                body: requestBody,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
