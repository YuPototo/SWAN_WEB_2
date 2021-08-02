import { emptySplitApi } from ".";

interface User {
    userId: number;
    username: string;
    postKarma: number;
}

export const userApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getUserInfoById: build.query<User, number>({
            query: (userId: number) => `/users/${userId}`,
            providesTags: ["User"],
        }),
    }),
});

export const { useGetUserInfoByIdQuery } = userApi;
