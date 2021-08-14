import { ReactElement, useState } from "react";

import {
    CaretUp,
    CaretUpFill,
    CaretDown,
    CaretDownFill,
} from "react-bootstrap-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useHistory } from "react-router-dom";

import { selectUsername } from "../../features/auth/authSlice";
import { getTimeToNow } from "../../utils/timeDiff";
import { shortenURL, clipLongString } from "../../utils/urlHelper";
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
        return "text-red-500 mx-1";
    } else if (voteDirection === -1) {
        return "text-blue-500 mx-1";
    }
    return "text-gray-600 mx-1";
};

interface VoteButtonProps {
    voteDirection?: VoteDirection;
    onClick: () => void;
}

const DownvoteButton = ({ voteDirection, onClick }: VoteButtonProps) => {
    if (voteDirection === -1) {
        return (
            <CaretDownFill
                size={30}
                className="text-blue-500 cursor-pointer"
                onClick={() => onClick()}
            />
        );
    } else {
        return (
            <CaretDown
                size={30}
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
                size={30}
                className=" text-red-500 cursor-pointer"
                onClick={onClick}
            />
        );
    } else {
        return (
            <CaretUp
                size={30}
                className=" text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={onClick}
            />
        );
    }
};

interface Props {
    showForumName: boolean;
    showAll: boolean;
    post: Post;
}

export default function PostCard({
    post,
    showAll,
    showForumName,
}: Props): ReactElement {
    const {
        id: postId,
        title,
        body,
        createdAt,
        score,
        author,
        postType,
    } = post;
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
        <div
            style={{
                gridTemplateRows: "1fr auto",
                gridTemplateColumns: "1fr minmax(0, 100%)",
            }}
            className="grid gap-1 bg-white rounded"
        >
            <div className="col-span-2 pt-3 px-4  md:col-span-1 md:px-1">
                <div className="mb-1.5">
                    {showForumName ? (
                        <span
                            className="text-xs mr-1 text-gray-800 cursor-pointer"
                            onClick={() => history.push(`/f/${post.forum.id}`)}
                        >
                            {post.forum.name}
                        </span>
                    ) : null}
                    <span
                        className="mr-1 text-xs text-gray-500"
                        // onClick={() =>
                        //     history.push(`/profile/${post.author.id}`)
                        // }
                    >
                        {authorName}
                    </span>
                    <span className="text-xs text-gray-500">
                        {createdAt ? getTimeToNow(createdAt) : undefined}
                    </span>
                </div>
                <div
                    className="text-lg text-gray-900 cursor-pointer mb-2"
                    onClick={() => history.push(`/post/${post.id}`)}
                >
                    {title}
                </div>
                <div className="my-2">
                    {body ? (
                        postType === "URL" ? (
                            <a
                                href={body}
                                className="text-sm link"
                                rel="noreferrer"
                                target="_blank"
                            >
                                {shortenURL(body, 30)}
                            </a>
                        ) : (
                            <span
                                className="text-sm text-gray-800 card-text"
                                style={{
                                    wordWrap: "break-word",
                                    whiteSpace: showAll ? "pre-wrap" : "normal",
                                }}
                                onClick={() => history.push(`/post/${post.id}`)}
                            >
                                {showAll ? body : clipLongString(body, 150)}
                            </span>
                        )
                    ) : null}
                </div>
            </div>
            <div className="flex content-center pl-4 pr-2 md:px-1 md:pt-1 md:col-start-1 md:row-start-1 md:row-span-2 md:items-center md:flex-col md:mr-1 md:bg-gray-50">
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
            <div className="flex gap-1 ml-1 pb-3 md:ml-0">
                <button
                    className="text-sm p-1 text-gray-500 hover:text-blue-500"
                    onClick={() => history.push(`/post/${post.id}`)}
                >
                    评论({post.commentCount})
                </button>
                <CopyToClipboard
                    text={`http://haoxigua.top/post/${post.id}`} // 技术债啊
                    onCopy={() => toast.success("已复制文章链接")}
                >
                    <button className="text-sm p-1 text-gray-500 hover:text-blue-500">
                        分享
                    </button>
                </CopyToClipboard>

                {isAuthor ? (
                    <>
                        {postType === "SELF_POST" ? (
                            <button
                                className="text-sm p-1 text-gray-500 hover:text-blue-500"
                                onClick={() =>
                                    history.push(`/editPost/${postId}`)
                                }
                            >
                                编辑
                            </button>
                        ) : null}

                        <button
                            className="text-sm p-1 text-gray-500 hover:text-blue-500"
                            onClick={handleDelete}
                        >
                            删除
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    );
}
