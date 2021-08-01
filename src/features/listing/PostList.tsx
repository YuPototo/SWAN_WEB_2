import { ReactElement } from "react";
import { Post } from "../../types/types";
import PostCard from "../postCard/PostCard";

interface Props {
    posts: Post[];
}

export default function PostList({ posts }: Props): ReactElement {
    return (
        <div>
            {posts.map((post) => (
                <PostCard post={post} isAuthor={false} key={post.id} />
            ))}
        </div>
    );
}
