import { emptySplitApi } from ".";

type VoteRecord = {
    postId: number;
    direction: 1 | -1;
};

interface VotesRecordsResponse {
    votes: VoteRecord[];
}

interface VoteRecordsRequestData {
    postIds: number[];
}

export const voteApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getVotes: build.mutation<VoteRecord[], VoteRecordsRequestData>({
            query: ({ postIds }) => ({
                url: `votes/manyPosts`,
                method: "POST",
                body: { postIds },
            }),
            transformResponse: (response: VotesRecordsResponse) =>
                response.votes,
            invalidatesTags: ["Vote"],
        }),
    }),
});

export const { useGetVotesMutation } = voteApi;
