import React, { ReactElement, useState } from "react";
import { useAddCommentMutation } from "../../app/services/comment";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../auth/authSlice";
import { useHistory } from "react-router-dom";
import analytics from "../../analytics/analytics";

interface Props {
    postId: number;
    parentCommentId?: number;
    onCancel: () => void;
}

export default function CommentBox({
    postId,
    parentCommentId,
    onCancel,
}: Props): ReactElement {
    const history = useHistory();
    const [comment, setComment] = useState("");
    const [addComment] = useAddCommentMutation();
    const isLogin = useAppSelector(selectIsAuthenticated);

    const isCommentReply = parentCommentId !== undefined;

    const submitComment = async () => {
        if (!isLogin) {
            toast("注册账号后，即可评论");
            setTimeout(() => {
                history.push("/signup");
            }, 2000);
            return;
        }

        if (comment.trim().length === 0) {
            toast("你好像什么也没写");
            return;
        }

        const data = {
            postId,
            parentId: parentCommentId,
            body: comment,
        };
        const loadingToastId = toast.loading("等待中...");

        try {
            await addComment(data).unwrap();
            toast.success("评论成功");
            setComment("");
            if (isCommentReply) {
                onCancel();
            }
            analytics.sendEvent({
                category: "comment",
                action: "submit comment",
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
                minRows={3}
                value={comment}
                onChange={handleChange}
            />
            <div className="flex justify-end mt-2">
                {isCommentReply ? (
                    <button
                        className="btn-sm btn-info--outline"
                        onClick={() => onCancel()}
                    >
                        取消
                    </button>
                ) : null}

                <button
                    className="btn-sm btn-primary mx-3"
                    onClick={submitComment}
                >
                    发表评论
                </button>
            </div>
        </div>
    );
}
