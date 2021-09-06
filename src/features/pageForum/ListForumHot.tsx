import { ReactElement, useEffect } from "react";
import { useGetForumHotListingQuery } from "../../app/services/listing";
import { useGetVotesMutation } from "../../app/services/vote";

import PostList from "../../components/PostList";
import Pager from "../../components/Pager";

interface Props {
    forumId: number;
    currentPage: number;
    isLogin: boolean;
    onChangePage: (direction: 1 | -1) => void;
}

export default function ListAllHot({
    forumId,
    currentPage,
    isLogin,
    onChangePage,
}: Props): ReactElement {
    const { data, isLoading: isLoadingPost } = useGetForumHotListingQuery({
        forumId,
        page: currentPage,
    });
    const posts = data?.posts;
    const hasNextPage = data?.hasNextPage;
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
            <PostList
                posts={posts}
                showForumName={false}
                cardPosition="forum"
                hasNextPage={hasNextPage}
            />
            <Pager
                hasNextPage={hasNextPage}
                hasLastPage={currentPage > 0}
                onChangePage={(direction) => onChangePage(direction)}
            />
        </>
    );
}
