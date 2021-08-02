import { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

import { useGetPostQuery } from "../../app/services/post";
import PostCard from "../postCard/PostCard";

function Post(): ReactElement {
    const history = useHistory();

    const { postId: postIdString } = useParams<{ postId: string }>();
    const postId = parseInt(postIdString);

    const { data: post, isLoading } = useGetPostQuery(postId);

    useEffect(() => {
        if (isLoading) return;
        if (!post) {
            const toastId = toast.error("找不到这篇内容");
            setTimeout(() => {
                toast.dismiss(toastId);
                history.push("/");
            }, 1500);
        }
    }, [isLoading, postId, history, post]);

    if (isLoading) return <div>加载中...</div>;

    if (!post) {
        return <></>;
    }

    return (
        <div className="bg-white py-4 px-8 mx-auto md:max-w-2xl">
            <PostCard post={post} />
            <button
                className="btn btn-primary mt-2 ml-5"
                onClick={() => history.push("/")}
            >
                返回首页
            </button>
        </div>
    );
}

export default Post;
