import { ReactElement } from "react";
import PostCard from "../postCard/PostCard";
import type { PostInCard } from "../postCard/PostCard";

interface Props {
    posts: PostInCard[];
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
