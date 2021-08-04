import { emptySplitApi } from ".";
import { Post } from "../../types/types";

type UserId = number;
interface User {
    userId: UserId;
    username: string;
    postKarma: number;
    posts: Post[];
}

export const userApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getUserInfoById: build.query<User, UserId>({
            query: (userId: UserId) => `/users/${userId}`,
            providesTags: ["User"],
        }),
        getUserPosts: build.query<Post[], UserId>({
            query: (userId: UserId) =>
                `/listing/users/${userId}?$skip=0&limit=30`,
            providesTags: ["User"],
            transformResponse: (response: { posts: Post[] }) => response.posts,
        }),
    }),
});

export const { useGetUserInfoByIdQuery, useGetUserPostsQuery } = userApi;
