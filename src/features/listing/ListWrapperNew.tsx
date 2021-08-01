import { ReactElement } from "react";
import { useGetNewListingQuery } from "../../app/services/listing";

import PostList from "./PostList";

interface Props {
    currentPage: number;
}

export default function ListNewWrapper({ currentPage }: Props): ReactElement {
    const { data: listing } = useGetNewListingQuery(currentPage);
    if (!listing) {
        return <div>no posts</div>;
    }
    return (
        <div>
            <PostList posts={listing.posts} />
        </div>
    );
}
