import React, { ReactElement, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../auth/authSlice";
import { useCreatePostMutation } from "../../app/services/post";

function SubmitPost(): ReactElement {
    const history = useHistory();

    // * 检查是否处于登陆状态
    const isLogin = useAppSelector(selectIsAuthenticated);

    useEffect(() => {
        if (!isLogin) {
            const warningToastId = toast.error(`未登陆，请先创建账号`);

            setTimeout(() => {
                history.push("/signup");
                toast.dismiss(warningToastId);
            }, 2000);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [createPost, { isLoading }] = useCreatePostMutation();

    // * 本地状态和需要的全局状态
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // * 处理 submit
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const loadingToastId = toast.loading("等待中...");
        try {
            const post = await createPost({ title, body }).unwrap();
            toast.success(`发布成功`);
            setTimeout(() => {
                history.push(`post/${post.id}`);
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                        onChange={(e) => setBody(e.target.value)}
                    ></input>
                </div>
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isLoading}
                >
                    发布
                </button>
            </form>
        </div>
    );
}

export default SubmitPost;
