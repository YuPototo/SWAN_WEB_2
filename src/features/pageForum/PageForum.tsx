import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useHistory } from "react-router-dom";

import toast from "react-hot-toast";

import ForumListManager from "./ForumListManager";
import {
    selectIsAuthenticated,
    selectHasFetchLocalToken,
} from "../auth/authSlice";
import {
    useGetForumInfoQuery,
    useJoinForumMutation,
    useLeaveForumMutation,
} from "../../app/services/forum";

/*
bug：如果直接从浏览器进入某个社区，不会获取到正确的加入信息。
原因： 
*/

export default function PageForum(): ReactElement {
    const { forumId: forumIdString } = useParams<{ forumId: string }>();
    const forumId = parseInt(forumIdString);

    const isLogin = useAppSelector(selectIsAuthenticated);
    const hasFetchLocalToken = useAppSelector(selectHasFetchLocalToken);

    // skip: https://redux-toolkit.js.org/rtk-query/usage/conditional-fetching
    const [skip, setSkip] = useState(true);
    const { data: forumInfo, isLoading: isInfoLoading } = useGetForumInfoQuery(
        forumId,
        { skip }
    );

    const [joinForum] = useJoinForumMutation();
    const [leaveForum] = useLeaveForumMutation();

    const history = useHistory();

    useEffect(() => {
        // 获取了本地 token 后，再去 fetch forum 信息
        if (hasFetchLocalToken) {
            setSkip(false);
        }
    }, [hasFetchLocalToken]);

    const handleJoinForum = async () => {
        if (!isLogin) {
            toast("注册账号后，即可加入");
            setTimeout(() => {
                history.push("/signup");
            }, 1500);
            return;
        }

        const loadingToastId = toast.loading("等待中...");

        try {
            const data = await joinForum(forumId).unwrap();
            toast.success(`已加入 ${data.forum.name}社区`);
        } catch (err) {
            toast.error(err.data?.message);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    const handleLeaveForum = async () => {
        const loadingToastId = toast.loading("等待中...");

        try {
            const data = await leaveForum(forumId).unwrap();
            toast.success(`已离开 ${data.forum.name}社区`);
        } catch (err) {
            toast.error(err.data?.message);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    const handleShare = () => {
        if (!isLogin) {
            toast("未登陆，请先创建账号😊");
            setTimeout(() => {
                history.push("/signup");
            }, 1500);
        } else {
            history.push(`/submitPost?forumId=${forumId}`);
        }
    };

    return (
        <div
            className="md:grid md:gap-2"
            style={{
                gridTemplateRows: "auto auto auto auto",
                gridTemplateColumns: "68% 32%",
            }}
        >
            <div className="flex flex-col items-center bg-white my-2 py-3 rounded md:flex-row md:pl-5 md:py-5">
                <h1 className="text-xl text-gray-700 mb-3 md:inline md:mb-0">
                    {isInfoLoading ? "社区" : forumInfo?.forum.name + " 社区"}
                </h1>
                {forumInfo?.hasJoined ? (
                    <div
                        className="btn-sm btn-info--outline mx-3 cursor-pointer md:self-center "
                        onClick={handleLeaveForum}
                    >
                        已加入
                    </div>
                ) : (
                    <button
                        className="btn-sm btn-primary self-stretch mx-3 cursor-pointer md:self-center"
                        onClick={handleJoinForum}
                    >
                        加入
                    </button>
                )}
            </div>
            <div className="md:row-start-2 md:col-start-1"></div>
            <div className="rounded bg-white p-4 my-2 md:row-span-2">
                <p className="text-gray-700 mb-2">有想要分享的内容吗？</p>
                <button
                    className="btn btn-primay--outline"
                    onClick={handleShare}
                >
                    发布一个内容
                </button>
            </div>
            <div className="h-full md:row-start-3 md:col-start-1 md:-mt-6">
                <ForumListManager forumId={forumId} isLogin={isLogin} />
            </div>
        </div>
    );
}
