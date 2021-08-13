import { emptySplitApi } from ".";

import { Post, Listing } from "../../types/types";

const defaultItemLength = 30;

const pageToQuery = (page: number): string => {
    return `skip=${page * defaultItemLength}&limit=${defaultItemLength}`;
};

interface ForumQuery {
    page: number;
    forumId: number;
}

export const listingApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getAllHotListing: build.query<Post[], number>({
            query: (page: number) => `listing/hot/all?${pageToQuery(page)}`,
            transformResponse: (response: Listing) => response.posts,
            providesTags: ["Listing"],
        }),
        getAllNewListing: build.query<Post[], number>({
            query: (page: number) => `listing/new/all?${pageToQuery(page)}`,
            transformResponse: (response: Listing) => response.posts,
            providesTags: ["Listing"],
        }),
        getUserHotListing: build.query<Post[], number>({
            query: (page: number) => `listing/hot/user?${pageToQuery(page)}`,
            transformResponse: (response: Listing) => response.posts,
            providesTags: ["Listing"],
        }),
        getUserNewListing: build.query<Post[], number>({
            query: (page: number) => `listing/new/user?${pageToQuery(page)}`,
            transformResponse: (response: Listing) => response.posts,
            providesTags: ["Listing"],
        }),
        getForumHotListing: build.query<Post[], ForumQuery>({
            query: ({ page, forumId }: ForumQuery) =>
                `listing/hot/forums/${forumId}?${pageToQuery(page)}`,
            transformResponse: (response: Listing) => response.posts,
            providesTags: ["Listing"],
        }),
        getForumNewListing: build.query<Post[], ForumQuery>({
            query: ({ page, forumId }: ForumQuery) =>
                `listing/new/forums/${forumId}?${pageToQuery(page)}`,
            transformResponse: (response: Listing) => response.posts,
            providesTags: ["Listing"],
        }),
    }),
});

export const {
    useGetAllHotListingQuery,
    useGetAllNewListingQuery,
    useGetUserHotListingQuery,
    useGetUserNewListingQuery,
    useGetForumHotListingQuery,
    useGetForumNewListingQuery,
} = listingApi;
