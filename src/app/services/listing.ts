import { emptySplitApi } from ".";

import { Post } from "../../types/types";
import config from "../../config/config";

const defaultItemLength = config.LISTING_NUBMER;

const pageToQuery = (page: number): string => {
    return `skip=${page * defaultItemLength}&limit=${defaultItemLength}`;
};

interface ForumQuery {
    page: number;
    forumId: number;
}

interface ListingResponse {
    posts: Post[];
    hasNextPage: boolean;
}

export const listingApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getAllHotListing: build.query<ListingResponse, number>({
            query: (page: number) => `listing/hot/all?${pageToQuery(page)}`,
            providesTags: ["Listing"],
        }),
        getAllNewListing: build.query<ListingResponse, number>({
            query: (page: number) => `listing/new/all?${pageToQuery(page)}`,
            providesTags: ["Listing"],
        }),
        getUserHotListing: build.query<ListingResponse, number>({
            query: (page: number) => `listing/hot/user?${pageToQuery(page)}`,
            providesTags: ["Listing"],
        }),
        getUserNewListing: build.query<ListingResponse, number>({
            query: (page: number) => `listing/new/user?${pageToQuery(page)}`,
            providesTags: ["Listing"],
        }),
        getForumHotListing: build.query<ListingResponse, ForumQuery>({
            query: ({ page, forumId }: ForumQuery) =>
                `listing/hot/forums/${forumId}?${pageToQuery(page)}`,
            providesTags: ["Listing"],
        }),
        getForumNewListing: build.query<ListingResponse, ForumQuery>({
            query: ({ page, forumId }: ForumQuery) =>
                `listing/new/forums/${forumId}?${pageToQuery(page)}`,
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
