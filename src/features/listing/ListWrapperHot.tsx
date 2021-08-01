import { ReactElement } from "react";
import { useGetHotListingQuery } from "../../app/services/listing";

import PostList from "./PostList";

interface Props {
    currentPage: number;
}

export default function ListHotWrapper({ currentPage }: Props): ReactElement {
    const { data: posts, isLoading } = useGetHotListingQuery(currentPage);
    if (isLoading) {
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
