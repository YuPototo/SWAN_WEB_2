import { ReactElement } from "react";
import { useGetAllNewListingQuery } from "../../app/services/listing";

import PostList from "../../components/PostList";

interface Props {
    currentPage: number;
}

export default function ListAllNew({ currentPage }: Props): ReactElement {
    const { data: posts, isLoading: isLoadingPost } =
        useGetAllNewListingQuery(currentPage);

    if (isLoadingPost) {
        return <div className="bg-white p-2">加载中...</div>; // todo: 换成一个 spinner
    }

    if (!posts) {
        return <div>no posts ?</div>;
    }
    return (
        <>
            <PostList posts={posts} showForumName={true} />
        </>
    );
}
