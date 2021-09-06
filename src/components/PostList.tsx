import { ReactElement } from "react";
import PostCard, { CardPosition } from "../features/postCard/PostCard";
import type { Post } from "../types/types";

interface Props {
    showForumName: boolean;
    cardPosition: CardPosition;
    posts: Post[];
    hasNextPage?: boolean;
}

export default function PostList({
    posts,
    cardPosition,
    hasNextPage,
}: Props): ReactElement {
    return (
        <>
            {posts.map((post) => (
                <div
                    className="my-3 rounded border border-solid border-gray-200 hover:border-gray-300"
                    key={post.id}
                >
                    <PostCard post={post} cardPosition={cardPosition} />
                </div>
            ))}
            {hasNextPage ? null : (
                <div className="bg-white p-3 rounded text-gray-600 my-2">
                    这是社区的尽头，没有更多内容了
                </div>
            )}
        </>
    );
}
