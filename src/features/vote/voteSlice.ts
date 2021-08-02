/*
  这个 slice 处理 post 页的状态
*/

import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { voteApi, VoteRecord } from "../../app/services/vote";

// state
export interface VoteEntities {
    [key: number]: VoteRecord;
}

export interface VoteState {
    votes: VoteEntities;
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
        builder.addMatcher(
            voteApi.endpoints.addVote.matchFulfilled,
            (state, { payload }) => {
                const newVote = {
                    [payload.postId]: {
                        postId: payload.postId,
                        direction: payload.direction,
                    },
                };
                state.votes = { ...state.votes, ...newVote };
            }
        );
        builder.addMatcher(
            voteApi.endpoints.reverseVote.matchFulfilled,
            (state, { payload }) => {
                const newVote = {
                    [payload.postId]: {
                        postId: payload.postId,
                        direction: payload.direction,
                    },
                };
                state.votes = { ...state.votes, ...newVote };
            }
        );
        builder.addMatcher(
            voteApi.endpoints.deleteVote.matchFulfilled,
            (state, { payload }) => {
                delete state.votes[payload.postId];
            }
        );
    },
});

// export action creators
export const { removeUserVotes } = voteSlice.actions;

// export selector
export const selectUserVoteByPostId =
    (postId?: number) => (state: RootState) => {
        if (postId) {
            return state.vote.votes[postId]?.direction;
        }
    };

export default voteSlice.reducer;
