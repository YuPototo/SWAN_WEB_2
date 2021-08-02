import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { emptySplitApi } from "./services";
import auth from "../features/auth/authSlice";
import vote from "../features/vote/voteSlice";

export const store = configureStore({
    reducer: {
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
        auth,
        vote,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emptySplitApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
