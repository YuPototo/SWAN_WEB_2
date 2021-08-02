import { emptySplitApi } from ".";

export interface VoteRecord {
    postId: number;
    direction: 1 | -1;
}

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
        }),
        addVote: build.mutation<VoteRecord, VoteRecord>({
            query: (vote: VoteRecord) => ({
                url: `votes/new`,
                method: "POST",
                body: vote,
            }),
        }),
        reverseVote: build.mutation<VoteRecord, VoteRecord>({
            query: (vote: VoteRecord) => ({
                url: `votes/reverse`,
                method: "POST",
                body: vote,
            }),
        }),
        deleteVote: build.mutation<{ postId: number }, { postId: number }>({
            query: (data: { postId: number }) => ({
                url: `votes/delete`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetVotesMutation,
    useAddVoteMutation,
    useReverseVoteMutation,
    useDeleteVoteMutation,
} = voteApi;
