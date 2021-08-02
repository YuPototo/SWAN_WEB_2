import { ReactElement } from "react";
import PostCard from "../postCard/PostCard";
import type { Post } from "../../types/types";

interface Props {
    posts: Post[];
}

export default function PostList({ posts }: Props): ReactElement {
    return (
        <>
            {posts.map((post) => (
                <div
                    className="bg-white my-2 p-2 pt-3 rounded border border-solid border-gray-300 hover:border-gray-400"
                    key={post.id}
                >
                    <PostCard post={post} />
                </div>
            ))}
        </>
    );
}
