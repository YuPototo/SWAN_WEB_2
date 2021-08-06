import { ReactElement, useState } from "react";
import { useAddCommentMutation } from "../../app/services/comment";
import toast from "react-hot-toast";

interface Props {
    postId: number;
    parentCommentId?: number;
}

export default function CommentBox({
    postId,
    parentCommentId,
}: Props): ReactElement {
    const [comment, setComment] = useState("");
    const [addComment] = useAddCommentMutation();

    const submitComment = async () => {
        const data = {
            postId,
            parentId: parentCommentId,
            body: comment,
        };
        const loadingToastId = toast.loading("等待中...");

        try {
            await addComment(data);
            toast.success("评论成功");
        } catch (err) {
            toast.error(err.data?.message);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    return (
        <div className="m-1">
            <textarea
                className="text-input w-full"
                placeholder="说说你的想法"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
