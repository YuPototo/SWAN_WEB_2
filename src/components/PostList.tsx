import { ReactElement } from "react";
import PostCard, { CardPosition } from "../features/postCard/PostCard";
import type { Post } from "../types/types";

interface Props {
    showForumName: boolean;
    cardPosition: CardPosition;
    posts: Post[];
}

export default function PostList({ posts, cardPosition }: Props): ReactElement {
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
        </>
    );
}
