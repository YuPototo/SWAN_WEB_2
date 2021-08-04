import { ReactElement, useState } from "react";

import {
    CaretUp,
    CaretUpFill,
    CaretDown,
    CaretDownFill,
} from "react-bootstrap-icons";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useHistory } from "react-router-dom";

import { selectUsername } from "../../features/auth/authSlice";
import { getTimeToNow } from "../../utils/timeDiff";
import { shortenURL } from "../../utils/urlHelper";
import { useDeletePostMutation } from "../../app/services/post";
import { selectIsAuthenticated } from "../auth/authSlice";

import {
    useAddVoteMutation,
    useReverseVoteMutation,
    useDeleteVoteMutation,
} from "../../app/services/vote";

import { selectUserVoteByPostId, vote } from "../../features/vote/voteSlice";

import { Post } from "../../types/types";
import toast from "react-hot-toast";
import analytics from "../../analytics/analytics";

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
}

export default function PostCard({ post }: Props): ReactElement {
    const { id: postId, title, body, createdAt, score, author } = post;
    const { name: authorName } = author;

    const history = useHistory();
    const dispatch = useAppDispatch();

    const [deletePost] = useDeletePostMutation();
    const [addVote] = useAddVoteMutation();
    const [reverseVote] = useReverseVoteMutation();
    const [deleteVote] = useDeleteVoteMutation();

    const username = useAppSelector(selectUsername);
    const isAuthor = post.author.name === username;
    const userVote = useAppSelector(selectUserVoteByPostId(post.id));
    const scoreClass = getScoreClass(isAuthor, userVote);
    const isLogin = useAppSelector(selectIsAuthenticated);

    const [tempScore, setTempScore] = useState(score); // 这个处理本地 score 的方法不完美，以后再改

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

    const clickVote = async (
        clickDirection: VoteDirection,
        userVote?: VoteDirection
    ) => {
        if (!isLogin) {
            toast("注册账号后，即可投票");
            setTimeout(() => {
                history.push("/signup");
            }, 1500);
            return;
        }

        if (isAuthor) {
            toast("无法给自己的帖子投票");
            return;
        }

        try {
            if (!userVote) {
                addVote({ postId: post.id, direction: clickDirection });
                dispatch(
                    vote({ postId, direction: clickDirection, voteType: "add" })
                );
                setTempScore(tempScore + clickDirection);
                analytics.sendEvent({
                    category: "vote",
                    action: "vote post",
                    label: "new",
                });
            } else if (clickDirection === userVote) {
                deleteVote({ postId: post.id });
                dispatch(vote({ postId, voteType: "delete" }));
                setTempScore(tempScore - clickDirection);
                analytics.sendEvent({
                    category: "vote",
                    action: "vote post",
                    label: "delete",
                });
            } else if (clickDirection === -userVote) {
                reverseVote({ postId: post.id, direction: clickDirection });
                dispatch(
                    vote({
                        postId,
                        direction: clickDirection,
                        voteType: "reverse",
                    })
                );
                setTempScore(tempScore + clickDirection - userVote);
                analytics.sendEvent({
                    category: "vote",
                    action: "vote post",
                    label: "reverse",
                });
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center">
                <UpvoteButton
                    voteDirection={userVote}
                    isAuthor={isAuthor}
                    onClick={() => clickVote(1, userVote)}
                />
                <div className={scoreClass}>{tempScore}</div>
                <DownvoteButton
                    voteDirection={userVote}
                    onClick={() => clickVote(-1, userVote)}
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
                        className="mr-1"
                        // onClick={() =>
                        //     history.push(`/profile/${post.author.id}`)
                        // }
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
