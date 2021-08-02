import { ReactElement, useEffect } from "react";
import { useGetNewListingQuery } from "../../app/services/listing";

import { useGetVotesMutation } from "../../app/services/vote";
import { useAppSelector } from "../../app/hooks";

import { selectIsAuthenticated } from "../auth/authSlice";

import PostList from "./PostList";

interface Props {
    currentPage: number;
}

export default function ListNewWrapper({ currentPage }: Props): ReactElement {
    const { data: posts, isLoading: isLoadingPost } =
        useGetNewListingQuery(currentPage);
    const [getVotes, ,] = useGetVotesMutation();

    const isLogin = useAppSelector(selectIsAuthenticated);

    useEffect(() => {
        if (isLoadingPost) return;
        if (!posts) return;

        if (!isLogin) return;

        const postIds = posts?.map((post) => post.id);
        getVotes({ postIds })
            .unwrap()

            .catch((err) => console.log(err));
    }, [isLogin, isLoadingPost, currentPage, posts, getVotes]);

    if (!posts) {
        return <div>no posts</div>;
    }
    return (
        <div>
            <PostList posts={posts} />
        </div>
    );
}
