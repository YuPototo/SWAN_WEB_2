import { ReactElement, useState } from "react";

interface Props {
    postId: number;
    parentCommentId?: number;
}

export default function CommentBox({
    postId,
    parentCommentId,
}: Props): ReactElement {
    const [comment, setComment] = useState("");
    return (
        <div className="m-1">
            <textarea
                className="text-input w-full"
                placeholder="说说你的想法"
                rows={3}
                value={comment}
                autoFocus
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
                <button
                    className="btn btn-info--outline mr-3"
                    onClick={() => console.log("todo")}
                >
                    评论
                </button>
            </div>
        </div>
    );
}
