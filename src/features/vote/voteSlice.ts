/*
  这个 slice 处理 post 页的状态
*/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { voteApi, VoteRecord } from "../../app/services/vote";

// state
export interface VoteEntities {
    [key: number]: VoteRecord;
}

export interface VoteState {
    votes: VoteEntities;
}

interface Vote {
    postId: number;
    direction?: 1 | -1;
    voteType: "delete" | "add" | "reverse";
}

const initialState: VoteState = {
    votes: {},
};

// slice
export const voteSlice = createSlice({
    name: "vote",
    initialState,
    reducers: {
        removeUserVotes: (state) => {
            state.votes = {};
        },
        vote: (state, { payload }: PayloadAction<Vote>) => {
            if (payload.voteType === "add" || payload.voteType === "reverse") {
                if (!payload.direction) {
                    throw new Error("缺 direction");
                }
                const newVote = {
                    [payload.postId]: {
                        postId: payload.postId,
                        direction: payload.direction,
                    },
                };
                state.votes = { ...state.votes, ...newVote };
            } else if (payload.voteType === "delete") {
                delete state.votes[payload.postId];
            } else {
                throw new Error("vote type 不正确");
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            voteApi.endpoints.getVotes.matchFulfilled,
            (state, { payload }) => {
                for (const vote of payload) {
                    const newVote = {
                        [vote.postId]: {
                            postId: vote.postId,
                            direction: vote.direction,
                        },
                    };
                    state.votes = { ...state.votes, ...newVote };
                }
            }
        );

        // 不再关心投票结果的反馈
        // builder.addMatcher(
        //     voteApi.endpoints.addVote.matchFulfilled,
        //     (state, { payload }) => {
        //         const newVote = {
        //             [payload.postId]: {
        //                 postId: payload.postId,
        //                 direction: payload.direction,
        //             },
        //         };
        //         state.votes = { ...state.votes, ...newVote };
        //     }
        // );
        // builder.addMatcher(
        //     voteApi.endpoints.reverseVote.matchFulfilled,
        //     (state, { payload }) => {
        //         const newVote = {
        //             [payload.postId]: {
        //                 postId: payload.postId,
        //                 direction: payload.direction,
        //             },
        //         };
        //         state.votes = { ...state.votes, ...newVote };
        //     }
        // );
        // builder.addMatcher(
        //     voteApi.endpoints.deleteVote.matchFulfilled,
        //     (state, { payload }) => {
        //         delete state.votes[payload.postId];
        //     }
        // );
    },
});

// export action creators
export const { removeUserVotes, vote } = voteSlice.actions;

// export selector
export const selectUserVoteByPostId =
    (postId?: number) => (state: RootState) => {
        if (postId) {
            return state.vote.votes[postId]?.direction;
        }
    };

export default voteSlice.reducer;
