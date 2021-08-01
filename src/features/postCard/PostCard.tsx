import { ReactElement } from "react";

import {
    CaretUp,
    CaretUpFill,
    CaretDown,
    CaretDownFill,
} from "react-bootstrap-icons";
import { useAppSelector } from "../../app/hooks";
import { useHistory } from "react-router-dom";

import { selectUsername } from "../../features/auth/authSlice";
import { getTimeToNow } from "../../utils/timeDiff";
import { shortenURL } from "../../utils/urlHelper";
import { useDeletePostMutation } from "../../app/services/post";

import { Post } from "../../types/types";
import toast from "react-hot-toast";

type VoteDirection = 1 | -1;

const getScoreClass = (
    isAuthor: boolean,
    voteDirection?: VoteDirection
): string => {
    if (voteDirection === 1 || isAuthor) {
        return "text-red-500";
    } else if (voteDirection === -1) {
        return "text-blue-500";
    }
    return "text-gray-600";
};

interface VoteButtonProps {
    voteDirection?: VoteDirection;
    onClick: () => void;
}

const DownvoteButton = ({ voteDirection, onClick }: VoteButtonProps) => {
    if (voteDirection === -1) {
        return (
            <CaretDownFill
                size={28}
                className="text-blue-500 cursor-pointer"
                onClick={() => onClick()}
            />
        );
    } else {
        return (
            <CaretDown
                size={28}
                className="text-gray-400 hover:text-blue-500 cursor-pointer"
                onClick={() => onClick()}
            />
        );
    }
};

const UpvoteButton = ({
    voteDirection,
    isAuthor,
    onClick,
}: VoteButtonProps & { isAuthor: boolean }) => {
    if (voteDirection === 1 || isAuthor) {
        return (
            <CaretUpFill
                size={28}
                className="text-red-500 cursor-pointer"
                onClick={onClick}
            />
        );
    } else {
        return (
            <CaretUp
                size={28}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={onClick}
            />
        );
    }
};

interface Props {
    post: Post;
    isAuthor: boolean;
    voteDirection?: VoteDirection;
}

export default function PostCard({ post, voteDirection }: Props): ReactElement {
    const { id: postId, title, body, createdAt, score, author } = post;
    const { name: authorName } = author;

    const history = useHistory();

    const [deletePost] = useDeletePostMutation();

    const username = useAppSelector(selectUsername);
    const isAuthor = post.author.name === username;
    const scoreClass = getScoreClass(isAuthor, voteDirection);

    const handleDelete = async () => {
        const loadingToastId = toast.loading("等待中...");

        try {
            await deletePost({ postId }).unwrap();
            toast.success("删除成功");

            setTimeout(() => {
                history.push(`/`);
            }, 1500);
        } catch (err) {
            toast.error(err.data?.message);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    return (
        <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center">
                <UpvoteButton
                    voteDirection={voteDirection}
                    isAuthor={isAuthor}
                    onClick={() => console.log("upvote")}
                />
                <div className={scoreClass}>{score}</div>
                <DownvoteButton
                    voteDirection={voteDirection}
                    onClick={() => console.log("downvote")}
                />
            </div>
            <div>
                <a
                    href={body}
                    className="text-base cursor-pointer mb-2"
                    rel="noreferrer"
                    target="_blank"
                >
                    {title}
                </a>
                <div className="text-xs my-0.5 text-gray-600">
                    <span
                        className="mr-1 cursor-pointer"
                        onClick={() => console.log("tbd")}
                    >
                        {authorName}
                    </span>
                    <span>
                        {createdAt ? getTimeToNow(createdAt) : undefined}
                    </span>
                </div>
                {body ? (
                    <a
                        href={body}
                        className="text-sm link"
                        rel="noreferrer"
                        target="_blank"
                    >
                        {shortenURL(body)}
                    </a>
                ) : null}
                {isAuthor ? (
                    <div>
                        <button
                            className="text-sm text-gray-500 mr-3 hover:text-blue-500"
                            onClick={() => history.push(`/editPost/${postId}`)}
                        >
                            编辑
                        </button>
                        <button
                            className="text-sm text-gray-500 mr-3 hover:text-blue-500"
                            onClick={handleDelete}
                        >
                            删除
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
