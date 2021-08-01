import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config/config";

export const emptySplitApi = createApi({
    reducerPath: "api",
    // tagTypes: ["HotPosts", "NewPosts", "User"],
    tagTypes: ["Posts", "User"], // 暂时用这个，用户量变多后，再改用上面那个
    baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL }),
    endpoints: () => ({}),
});
