import { ReactElement, useState } from "react";
import { CommentTreeNode } from "../../types/types";
import { getTimeToNow } from "../../utils/timeDiff";
import CommentForm from "./CommentForm";

import { ArrowsAngleExpand } from "react-bootstrap-icons";

interface UserNameProps {
    authorName: string;
    createdAt: string;
}

const UserInfo = ({ authorName, createdAt }: UserNameProps) => {
    return (
        <div className="mb-1 flex content-center">
            <span className="text-sm text-gray-800 mr-2">{authorName}</span>
            <span className="text-xs text-gray-400">
                {getTimeToNow(createdAt)}
            </span>
        </div>
    );
};

interface Props {
    comment: CommentTreeNode;
}
export default function CommentCard({ comment }: Props): ReactElement {
    const [isFolded, setIsFolded] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);

    if (isFolded) {
        return (
            <div className="mt-3 flex content-center">
                <ArrowsAngleExpand
                    className=" text-gray-600 cursor-pointer mr-2"
                    onClick={() => setIsFolded(false)}
                />

                <UserInfo
                    authorName={comment.author.name}
                    createdAt={comment.createdAt}
                />
            </div>
        );
    }

    return (
        <div className="mt-2 w-full">
            <UserInfo
                authorName={comment.author.name}
                createdAt={comment.createdAt}
            />

            <div className="flex items-center">
                <div
                    className="px-2.5 self-stretch cursor-pointer comment-card-border-parent"
                    onClick={() => setIsFolded(true)}
                >
                    <div className="w-0.5 h-full bg-gray-300 comment-card-border"></div>
                </div>
                <div className="ml-3 w-full">
                    <div
                        className="mb-4 text-gray-800"
                        style={{ whiteSpace: "pre-wrap" }}
                    >
                        {comment.body}
                    </div>
                    <div className="mb-4 text-gray-500 text-xs">
                        <button onClick={() => setShowCommentForm(true)}>
                            回复
                        </button>
                    </div>

                    {showCommentForm ? (
                        <CommentForm
                            postId={comment.postId}
                            parentCommentId={comment.id}
                            onCancel={() => setShowCommentForm(false)}
                        />
                    ) : null}

                    <div className="mb-4">
                        {comment.children.map((child) => (
                            <CommentCard comment={child} key={child.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
