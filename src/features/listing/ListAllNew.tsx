import { ReactElement } from "react";
import { useGetAllNewListingQuery } from "../../app/services/listing";

import PostList from "../../components/PostList";
import Pager from "../../components/Pager";

interface Props {
    currentPage: number;
    onChangePage: (direction: 1 | -1) => void;
}

export default function ListAllNew({
    currentPage,
    onChangePage,
}: Props): ReactElement {
    const { data, isLoading: isLoadingPost } =
        useGetAllNewListingQuery(currentPage);

    const posts = data?.posts;
    const hasNextPage = data?.hasNextPage;

    if (isLoadingPost) {
        return <div className="bg-white p-2">加载中...</div>; // todo: 换成一个 spinner
    }

    if (!posts) {
        return <div>no posts ?</div>;
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
