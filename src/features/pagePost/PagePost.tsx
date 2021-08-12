import { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

import { useGetPostQuery } from "../../app/services/post";
import { useGetCommentsByPostQuery } from "../../app/services/comment";

import CommentForm from "./CommentForm";
import CommentTree from "./CommentTree";
import PostCard from "../postCard/PostCard";

function Post(): ReactElement {
    const history = useHistory();

    const { postId: postIdString } = useParams<{ postId: string }>();
    const postId = parseInt(postIdString);

    const { data: post, isLoading: isPostLoading } = useGetPostQuery(postId);
    const { data: comments, isLoading: isCommentLoading } =
        useGetCommentsByPostQuery(postId);

    useEffect(() => {
        if (isPostLoading) return;
        if (!post) {
            const toastId = toast.error("找不到这篇内容");
            setTimeout(() => {
                toast.dismiss(toastId);
                history.push("/");
            }, 1500);
        }
    }, [isPostLoading, postId, history, post]);

    if (isPostLoading) return <div>加载中...</div>;

    if (!post) {
        return <></>;
    }

    return (
        <div className="mx-auto md:max-w-2xl">
            <div className="bg-white p-3 px-4 rounded md:p-4 ">
                <PostCard post={post} showAll={true} />
            </div>
            <div className="bg-white p-1 mt-2 rounded">
                <CommentForm
                    postId={post.id}
                    onCancel={() => console.log("不需要")}
                />
            </div>
            <div className="bg-white mt-2 p-3 px-4 rounded md:p-4">
                {isCommentLoading ? (
                    <div className="text-gray-500">...</div>
                ) : comments && comments.length > 0 ? (
                    <CommentTree commentTree={comments} />
                ) : (
                    <div className="text-sm text-gray-500">暂无评论</div>
                )}
            </div>
        </div>
    );
}

export default Post;
