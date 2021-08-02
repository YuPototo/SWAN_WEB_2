import { ReactElement } from "react";
import PostCard from "../postCard/PostCard";
import type { Post } from "../../types/types";

interface Props {
    posts: Post[];
}

export default function PostList({ posts }: Props): ReactElement {
    return (
        <div>
            {posts.map((post) => (
                <PostCard post={post} key={post.id} />
            ))}
        </div>
    );
}
