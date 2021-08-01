import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

import { useGetPostQuery, useEditPostMutation } from "../../app/services/post";

function EditPost(): ReactElement {
    const { postId: postIdString } = useParams<{ postId: string }>();
    const postId = parseInt(postIdString);

    const history = useHistory();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const { data: post, isLoading } = useGetPostQuery(postId);
    const [updatePost, { isLoading: isUpdating }] = useEditPostMutation();

    useEffect(() => {
        if (isLoading) return;
        if (!post) {
            const toastId = toast.error("找不到这篇内容");
            setTimeout(() => {
                toast.dismiss(toastId);
                history.push("/");
            }, 1500);
            return;
        }
        setTitle(post.title);
        setBody(post.body);
    }, [isLoading, postId, history, post]);

    if (isLoading) return <div>加载中...</div>;

    if (!post) {
        return <></>;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const loadingToastId = toast.loading("等待中...");

        if (!postId) {
            throw new Error("postId 是 undefined");
        }

        try {
            await updatePost({ postId, title, body }).unwrap();
            toast.success("更新成功");

            setTimeout(() => {
                history.push(`/post/${postId}`);
            }, 1500);
        } catch (err) {
            toast.error(err.data?.message);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    return (
        <div className="bg-white py-4 px-8">
            <h1 className="text-lg my-5">分享一个链接</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center">
                    <label className="mr-2" htmlFor="title">
                        标题
                    </label>
                    <textarea
                        className="text-input flex-grow"
                        id="title"
                        name="title"
                        placeholder="起一个有吸引力的标题吧"
                        rows={2}
                        value={title}
                        autoFocus
                        disabled={isUpdating}
                        onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4 flex items-center">
                    <label className="mr-2" htmlFor="body">
                        链接
                    </label>
                    <input
                        className="text-input flex-grow"
                        type="body"
                        id="body"
                        name="body"
                        value={body}
                        placeholder="URL"
                        disabled={isUpdating}
                        onChange={(e) => setBody(e.target.value)}
                    ></input>
                </div>
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isUpdating}
                >
                    发布
                </button>
            </form>
        </div>
    );
}

export default EditPost;
