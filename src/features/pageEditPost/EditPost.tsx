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
            await updatePost({ postId, body }).unwrap();
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
            <h1 className="text-lg my-5">编辑</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center">
                    <h1 className="text-lg">{title}</h1>
                </div>
                <div className="mb-4 flex items-center">
                    <textarea
                        className="text-input flex-grow"
                        rows={3}
                        id="body"
                        name="body"
                        value={body}
                        placeholder="内容"
                        disabled={isUpdating}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex gap-2 justify-end mr-3">
                    <button
                        className="btn btn-info--outline"
                        type="button"
                        onClick={() => history.go(-1)}
                    >
                        返回
                    </button>

                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isUpdating}
                    >
                        确认更新
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;
