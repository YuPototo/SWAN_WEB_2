import { emptySplitApi } from ".";

import { Post, Listing } from "../../types/types";

const defaultItemLength = 5;

const pageToQuery = (page: number): string => {
    return `skip=${page * defaultItemLength}&limit=${defaultItemLength}`;
};

export const listingApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getHotListing: build.query<Post[], number>({
            query: (page: number) => `listing/hot?${pageToQuery(page)}`,
            transformResponse: (response: Listing) => response.posts,
            providesTags: ["Listing"],
        }),
        getNewListing: build.query<Post[], number>({
            query: (page: number) => `listing/new?${pageToQuery(page)}`,
            transformResponse: (response: Listing) => response.posts,
            providesTags: ["Listing"],
        }),
    }),
});

export const { useGetHotListingQuery, useGetNewListingQuery } = listingApi;
