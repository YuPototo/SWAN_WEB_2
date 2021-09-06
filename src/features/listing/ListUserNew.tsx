import { ReactElement, useEffect } from "react";
import { useGetUserNewListingQuery } from "../../app/services/listing";
import { useGetVotesMutation } from "../../app/services/vote";

import PostList from "../../components/PostList";
import NoForumHint from "./NoForumHint";
import Pager from "../../components/Pager";

interface Props {
    currentPage: number;
    onChangePage: (direction: 1 | -1) => void;
}

export default function ListUserNew({
    currentPage,
    onChangePage,
}: Props): ReactElement {
    const { data, isLoading: isLoadingPost } =
        useGetUserNewListingQuery(currentPage);
    const posts = data?.posts;
    const hasNextPage = data?.hasNextPage;
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

    if (currentPage === 0 && posts.length === 0) {
        return <NoForumHint />;
    }

    if (posts.length === 0) {
        return <div>暂无内容</div>;
    }

    return (
        <>
            <PostList
                posts={posts}
                showForumName={true}
                cardPosition="home"
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
