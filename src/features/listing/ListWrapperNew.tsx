import { ReactElement } from "react";
import { useGetNewListingQuery } from "../../app/services/listing";

import PostList from "./PostList";

interface Props {
    currentPage: number;
}

export default function ListNewWrapper({ currentPage }: Props): ReactElement {
    const { data: posts } = useGetNewListingQuery(currentPage);
    if (!posts) {
        return <div>no posts</div>;
    }
    return (
        <div>
            <PostList posts={posts} />
        </div>
    );
}
