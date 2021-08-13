import { ReactElement } from "react";
import PostCard from "../features/postCard/PostCard";
import type { Post } from "../types/types";

interface Props {
    showForumName: boolean;
    posts: Post[];
}

export default function PostList({
    posts,
    showForumName,
}: Props): ReactElement {
    return (
        <>
            {posts.map((post) => (
                <div
                    className="bg-white my-2 rounded border border-solid border-gray-300 hover:border-gray-400"
                    key={post.id}
                >
                    <PostCard
                        post={post}
                        showAll={false}
                        showForumName={showForumName}
                    />
                </div>
            ))}
        </>
    );
}
