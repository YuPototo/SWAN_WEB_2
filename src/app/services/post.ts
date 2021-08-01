import { emptySplitApi } from ".";
import { Post } from "../../types/types";

type PostId = number;

interface PostResponse {
    post: Post;
}

export interface CreatePostRequestData {
    title: string;
    body: string;
}

export const postApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getPost: build.query<Post, PostId>({
            query: (postId: number) => `posts/${postId}`,
            providesTags: ["Post"],
            transformResponse: (response: PostResponse) => response.post,
        }),
        createPost: build.mutation<Post, CreatePostRequestData>({
            query: (requestBody) => ({
                url: "posts",
                method: "POST",
                body: requestBody,
            }),
            invalidatesTags: ["Listing", "Post"],
            transformResponse: (response: PostResponse) => response.post,
        }),
    }),
});

export const { useGetPostQuery, useCreatePostMutation } = postApi;
