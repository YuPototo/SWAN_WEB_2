import React, { ReactElement, useState } from "react";
import { useUpdateCommentMutation } from "../../app/services/comment";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../auth/authSlice";
import { useHistory } from "react-router-dom";
import analytics from "../../analytics/analytics";
import { CommentTreeNode } from "../../types/types";

interface Props {
    comment: CommentTreeNode;
    onCancel: () => void;
}

export default function CommentBox({ comment, onCancel }: Props): ReactElement {
    const history = useHistory();
    const [commentBody, setComment] = useState(comment.body);
    const [updateComment] = useUpdateCommentMutation();
    const isLogin = useAppSelector(selectIsAuthenticated);

    const submitComment = async () => {
        if (!isLogin) {
            toast("注册账号后，即可评论");
            setTimeout(() => {
                history.push("/signup");
            }, 2000);
            return;
        }

        if (commentBody.trim().length === 0) {
            toast("你好像什么也没写");
            return;
        }

        const loadingToastId = toast.loading("等待中...");

        try {
            await updateComment({
                commentId: comment.id,
                body: commentBody,
            }).unwrap();
            toast.success("更新成功");

            setComment("");
            onCancel();
            analytics.sendEvent({
                category: "comment",
                action: "update comment",
            });
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
            <TextareaAutosize
                className="text-input w-full"
                placeholder="说说你的想法"
                rows={3}
                value={commentBody}
                onChange={handleChange}
            />
            <div className="flex justify-end">
                <button
                    className="btn-sm btn-info--outline"
                    onClick={() => onCancel()}
                >
                    取消
                </button>

                <button
                    className="btn-sm btn-primary mx-3"
                    onClick={submitComment}
                >
                    更新评论
                </button>
            </div>
        </div>
    );
}
