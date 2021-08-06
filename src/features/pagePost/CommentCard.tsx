import React, { ReactElement } from "react";
import { CommentTreeNode } from "../../types/types";
import { getTimeToNow } from "../../utils/timeDiff";

interface Props {
    comment: CommentTreeNode;
}
export default function CommentCard({ comment }: Props): ReactElement {
    return (
        <div className="py-1 mb-4">
            <div className="mb-1">
                <span className="text-sm text-gray-800 mr-2">
                    {comment.author.name}
                </span>
                <span className="text-xs text-gray-400">
                    {getTimeToNow(comment.createdAt)}
                </span>
            </div>
            <div
                className="ml-3 text-gray-800"
                style={{ whiteSpace: "pre-wrap" }}
            >
                {comment.body}
            </div>
        </div>
    );
}
