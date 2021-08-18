import { ReactElement, useEffect } from "react";
import { useGetUserHotListingQuery } from "../../app/services/listing";
import { useGetVotesMutation } from "../../app/services/vote";

import PostList from "../../components/PostList";
import NoForumHint from "./NoForumHint";

interface Props {
    currentPage: number;
}

export default function ListUserHot({ currentPage }: Props): ReactElement {
    const { data: posts, isLoading: isLoadingPost } =
        useGetUserHotListingQuery(currentPage);

    const [getVotes] = useGetVotesMutation();

    // 获取用户对这些 post 的投票情况，比较丑陋，以后再改。
    useEffect(() => {
        if (isLoadingPost) return;
        if (!posts) return;

        const postIds = posts?.map((post) => post.id);

        getVotes({ postIds })
            .unwrap()
            .catch((err) => console.log(err));
    }, [isLoadingPost, currentPage, posts, getVotes]);

    if (isLoadingPost) {
        return <div className="bg-white p-2">加载中...</div>; // todo: 换成一个 spinner
    }
    if (!posts) {
        return <div>No Post?</div>;
    }

    if (posts.length === 0) {
        return <NoForumHint />;
    }

    return (
        <>
            <PostList posts={posts} showForumName={true} cardPosition="home" />
        </>
    );
}
