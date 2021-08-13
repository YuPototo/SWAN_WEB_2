import { emptySplitApi } from ".";

interface Forum {
    forum: {
        id: number;
        name: string;
    };
}

interface ForumInfo extends Forum {
    hasJoined?: boolean;
}

export const forumApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getForumInfo: build.query<ForumInfo, number>({
            query: (forumId: number) => `forums/${forumId}`,
        }),
        joinForum: build.mutation<Forum, number>({
            query: (forumId: number) => ({
                url: "forums/join",
                method: "POST",
                body: { forumId },
            }),
            invalidatesTags: ["Listing"],
        }),
        leaveForum: build.mutation<Forum, number>({
            query: (forumId: number) => ({
                url: "forums/leave",
                method: "POST",
                body: { forumId },
            }),
            invalidatesTags: ["Listing"],
        }),
    }),
});

export const {
    useGetForumInfoQuery,
    useJoinForumMutation,
    useLeaveForumMutation,
} = forumApi;
