import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config/config";
import { RootState } from "../store";

export const emptySplitApi = createApi({
    reducerPath: "api",
    tagTypes: ["Listing", "Post", "User", "Vote"],
    baseQuery: fetchBaseQuery({
        baseUrl: config.BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});
