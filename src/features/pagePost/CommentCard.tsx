import { ReactElement, useState } from "react";
import { CommentTreeNode } from "../../types/types";
import { getTimeToNow } from "../../utils/timeDiff";
import CommentForm from "./CommentForm";

import { ArrowsAngleExpand } from "react-bootstrap-icons";
import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../features/auth/authSlice";
import { useDeleteCommentMutation } from "../../app/services/comment";
import toast from "react-hot-toast";

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
    const [deleteComment, { isLoading: isDeleting }] =
        useDeleteCommentMutation();

    const username = useAppSelector(selectUsername);
    const isAuthor = comment.author.name === username;

    const handleDelete = async () => {
        const loadingToastId = toast.loading("等待中...");

        try {
            await deleteComment(comment.id);
            toast.success("删除成功");
        } catch (err) {
            toast.error(err.data?.message);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };
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
                    {comment.isDeleted ? (
                        <div className="mb-4 mt-2 text-gray-400 text-sm">
                            该评论已被删除
                        </div>
                    ) : (
                        <>
                            <div
                                className="mb-4 mt-2 text-gray-800"
                                style={{ whiteSpace: "pre-wrap" }}
                            >
                                {comment.body}
                            </div>

                            <div className="mb-4 text-gray-500 text-xs flex gap-2">
                                <button
                                    onClick={() => setShowCommentForm(true)}
                                    disabled={isDeleting}
                                >
                                    回复
                                </button>
                                {isAuthor ? (
                                    <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                    >
                                        删除
                                    </button>
                                ) : null}
                            </div>
                        </>
                    )}

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
