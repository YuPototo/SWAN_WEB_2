import { emptySplitApi } from ".";
import { CommentTree, Comment } from "../../types/types";

type PostId = number;

interface GetCommentResponseData {
    postId: PostId;
    commentTree: CommentTree;
}

interface AddCommentRequestData {
    postId: PostId;
    body: string;
    parentId?: number;
}

interface UpdateCommentArgs {
    body: string;
    commentId: number;
}

export const commentApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getCommentsByPost: build.query<CommentTree, PostId>({
            query: (postId: number) => `comments/posts/${postId}`,
            providesTags: ["Comment"],
            transformResponse: (response: GetCommentResponseData) =>
                response.commentTree,
        }),
        addComment: build.mutation<{ comment: Comment }, AddCommentRequestData>(
            {
                query: (body: AddCommentRequestData) => ({
                    url: `comments`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Comment"],
            }
        ),
        deleteComment: build.mutation<void, number>({
            query: (commentId: number) => ({
                url: `comments/${commentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Comment"],
        }),
        updateComment: build.mutation<{ comment: Comment }, UpdateCommentArgs>({
            query: ({ commentId, body }: UpdateCommentArgs) => ({
                url: `comments/${commentId}`,
                method: "PATCH",
                body: { body },
            }),
            invalidatesTags: ["Comment"],
        }),
    }),
});

export const {
    useGetCommentsByPostQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
} = commentApi;
