import { ReactElement, useEffect } from "react";
import { useGetForumHotListingQuery } from "../../app/services/listing";
import { useGetVotesMutation } from "../../app/services/vote";

import PostList from "../../components/PostList";

interface Props {
    forumId: number;
    currentPage: number;
    isLogin: boolean;
}

export default function ListAllHot({
    forumId,
    currentPage,
    isLogin,
}: Props): ReactElement {
    const { data: posts, isLoading: isLoadingPost } =
        useGetForumHotListingQuery({ forumId, page: currentPage });

    const [getVotes] = useGetVotesMutation();

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
        return <div className="bg-white p-2">加载中...</div>; // todo: 换成一个 spinner
    }
    if (!posts) {
        return <div>No Post?</div>;
    }

    return (
        <>
            <PostList posts={posts} showForumName={false} />
        </>
    );
}
