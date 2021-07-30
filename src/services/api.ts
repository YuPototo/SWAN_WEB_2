import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Listing } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
    endpoints: (build) => ({
        getHotListing: build.query<Listing, void>({
            query: () => `listing/hot`,
        }),
    }),
});

export const { useGetHotListingQuery } = api;
