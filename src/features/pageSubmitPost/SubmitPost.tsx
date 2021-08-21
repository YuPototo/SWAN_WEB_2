import React, { ReactElement, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

import SelectForumMenu from "./SelectForumMenu";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../auth/authSlice";
import { useCreatePostMutation } from "../../app/services/post";
import PostTypePicker, { PostType } from "./PostTypePicker";

import analytics from "../../analytics/analytics";
import { forums } from "../../data/forums";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SubmitPost(): ReactElement {
    const [postType, setPostType] = useState<PostType>("SELF_POST");

    const initialForum = forums[0];
    const [selectedForum, setSelectedForum] = useState(initialForum);

    const history = useHistory();
    let query = useQuery();

    useEffect(() => {
        const forumIdString = query.get("forumId");
        if (forumIdString) {
            let forumId = parseInt(forumIdString);
            const selectedForum = forums.find((forum) => forum.id === forumId);
            if (selectedForum) {
                setSelectedForum(selectedForum);
            }
        }
    }, [query]);

    // * 检查是否处于登录状态
    const isLogin = useAppSelector(selectIsAuthenticated);

    useEffect(() => {
        if (!isLogin) {
            const warningToastId = toast.error(`未登录，请先创建账号`);

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
            const post = await createPost({
                title,
                body,
                postType,
                forumId: selectedForum.id,
            }).unwrap();
            toast.success(`发布成功`);
            analytics.sendEvent({ category: "post", action: "submit post" });
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
        <div className="p-1">
            <h1 className="text-lg m-2 mb-4 text-gray-700">发布一个内容</h1>
            <div className="my-2 mb-4 bg-white w-full rounded md:w-1/3">
                <SelectForumMenu
                    forums={forums}
                    selectedForum={selectedForum}
                    setSelectedForum={setSelectedForum}
                />
            </div>
            <div className="bg-white rounded p-3">
                <div className="mb-3">
                    <PostTypePicker
                        postType={postType}
                        onChangePostType={(postType) => setPostType(postType)}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 flex-col gap-3 items-center">
                        <TextareaAutosize
                            className="text-input w-full mb-3"
                            id="title"
                            name="title"
                            placeholder="标题"
                            rows={2}
                            value={title}
                            autoFocus
                            disabled={isLoading}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {postType === "URL" ? (
                            <TextareaAutosize
                                className="text-input w-full"
                                id="body"
                                name="body"
                                value={body}
                                minRows={2}
                                placeholder="URL"
                                disabled={isLoading}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        ) : (
                            <TextareaAutosize
                                className="text-input w-full"
                                id="body"
                                name="body"
                                value={body}
                                minRows={3}
                                placeholder="正文（选填）"
                                disabled={isLoading}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        )}
                    </div>
                    <div className="flex gap-2 justify-end mr-3 mt-3">
                        <button
                            className="btn btn-primary--outline"
                            type="button"
                            onClick={() => history.go(-1)}
                        >
                            返回
                        </button>

                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            发布
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SubmitPost;
