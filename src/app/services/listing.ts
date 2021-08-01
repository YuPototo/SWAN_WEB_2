import { emptySplitApi } from ".";

import { Listing } from "../../types/types";

const defaultItemLength = 5;

const pageToQuery = (page: number): string => {
    return `skip=${page * defaultItemLength}&limit=${defaultItemLength}`;
};

export const listingApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getHotListing: build.query<Listing, number>({
            query: (page: number) => `listing/hot?${pageToQuery(page)}`,
            providesTags: ["Posts"],
        }),
        getNewListing: build.query<Listing, number>({
            query: (page: number) => `listing/new?${pageToQuery(page)}`,
            providesTags: ["Posts"],
        }),
    }),
});

export const { useGetHotListingQuery, useGetNewListingQuery } = listingApi;
