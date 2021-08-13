import { emptySplitApi } from ".";
import { Post } from "../../types/types";

type PostId = number;

interface PostResponse {
    post: Post;
}

export interface CreatePostRequestData {
    title: string;
    body: string;
    postType: "URL" | "SELF_POST";
    forumId: number;
}

interface UpdatePostRequestData {
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
        editPost: build.mutation<
            Post,
            UpdatePostRequestData & { postId: number }
        >({
            query: ({ postId, body }) => ({
                url: `posts/${postId}`,
                method: "PATCH",
                body: { body },
            }),
            invalidatesTags: ["Listing", "Post"],
            transformResponse: (response: PostResponse) => response.post,
        }),
        deletePost: build.mutation<void, { postId: number }>({
            query: ({ postId }) => ({
                url: `posts/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Listing", "Post"],
        }),
    }),
});

export const {
    useGetPostQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation,
} = postApi;
