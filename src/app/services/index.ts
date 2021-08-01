import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config/config";
import { RootState } from "../store";

export const emptySplitApi = createApi({
    reducerPath: "api",
    // tagTypes: ["HotListing", "NewPosting", "User"],
    tagTypes: ["Listing", "Post", "User"], // 暂时用这个，用户量变多后，再考虑改用上面那个
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
