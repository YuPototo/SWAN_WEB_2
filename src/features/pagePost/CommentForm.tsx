import React, { ReactElement, useState } from "react";
import { useAddCommentMutation } from "../../app/services/comment";
import toast from "react-hot-toast";

import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../auth/authSlice";
import { useHistory } from "react-router-dom";
import analytics from "../../analytics/analytics";

interface Props {
    postId: number;
    parentCommentId?: number;
}

export default function CommentBox({
    postId,
    parentCommentId,
}: Props): ReactElement {
    const history = useHistory();
    const [comment, setComment] = useState("");
    const [addComment] = useAddCommentMutation();
    const isLogin = useAppSelector(selectIsAuthenticated);

    const submitComment = async () => {
        if (!isLogin) {
            toast("注册账号后，即可评论");
            setTimeout(() => {
                history.push("/signup");
            }, 2000);
            return;
        }

        const data = {
            postId,
            parentId: parentCommentId,
            body: comment,
        };
        const loadingToastId = toast.loading("等待中...");

        try {
            await addComment(data);
            toast.success("评论成功");
            setComment("");
            analytics.sendEvent({ category: "post", action: "submit comment" });
        } catch (err) {
            toast.error(err.data?.message);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    // https://blaipratdesaba.com/react-typescript-cheatsheet-form-elements-and-onchange-event-types-8c2baf03230c
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    return (
        <div className="m-1">
            <textarea
                className="text-input w-full"
                placeholder="说说你的想法"
                rows={3}
                value={comment}
                onChange={handleChange}
            ></textarea>
            <div className="flex justify-end">
                <button
                    className="btn btn-info--outline mr-3"
                    onClick={submitComment}
                >
                    发表评论
                </button>
            </div>
        </div>
    );
}
