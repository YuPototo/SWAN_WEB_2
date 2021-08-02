import { ReactElement, useEffect } from "react";
import { useGetHotListingQuery } from "../../app/services/listing";
import { useGetVotesMutation } from "../../app/services/vote";
import { useAppSelector } from "../../app/hooks";

import { selectIsAuthenticated } from "../auth/authSlice";

import PostList from "./PostList";

interface Props {
    currentPage: number;
}

export default function ListHotWrapper({ currentPage }: Props): ReactElement {
    const { data: posts, isLoading: isLoadingPost } =
        useGetHotListingQuery(currentPage);
    const [getVotes] = useGetVotesMutation();

    const isLogin = useAppSelector(selectIsAuthenticated);

    // 获取用户对这些 post 的投票情况，比较丑陋，以后再改。
    useEffect(() => {
        if (isLoadingPost) return;
        if (!posts) return;
        if (!isLogin) return;

        const postIds = posts?.map((post) => post.id);

        getVotes({ postIds })
            .unwrap()
            .catch((err) => console.log(err));
    }, [isLogin, isLoadingPost, currentPage, posts, getVotes]);

    if (isLoadingPost) {
        return <div>加载中</div>; // 换成一个 spinner
    }
    if (!posts) {
        return <div>no posts</div>;
    }
    return (
        <div>
            <PostList posts={posts} />
        </div>
    );
}
