// 先不实现 profile 页面

import { ReactElement } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    useGetUserInfoByIdQuery,
    useGetUserPostsQuery,
} from "../../app/services/user";
import { useHistory } from "react-router-dom";

import { selectUserId } from "../auth/authSlice";
import PostList from "../../components/PostList";
import { avatars } from "../../data/avatars";
import { logout } from "../auth/authSlice";
import toast from "react-hot-toast";
import analytics from "../../analytics/analytics";

const getAvatars = (userId: number) => {
    const mod = userId % avatars.length;
    return avatars[mod]?.url;
};

export default function Profile(): ReactElement {
    const userId = useAppSelector(selectUserId) as number; // 技术债
    const { data: user } = useGetUserInfoByIdQuery(userId);
    const { data: posts } = useGetUserPostsQuery(userId);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch(logout());
        analytics.sendEvent({ category: "user", action: "logout" });
        toast.success("已登出");
        history.push("/");
    };

    return (
        <div>
            <div className="p-4 bg-white rounded">
                <div className="mb-2">
                    <span className="text-gray-600 mr-2">头像 </span>
                    <img
                        src={getAvatars(userId)}
                        alt="avatars"
                        className="inline flex-shrink-0 h-20 w-20 rounded"
                    />
                </div>
                <div className="mb-2">
                    <span className="text-gray-600 mr-2">用户名 </span>
                    <span>{user?.username}</span>
                </div>
                <div>
                    <span className="text-gray-600 mr-2">积分 </span>
                    <span>{user?.postKarma}</span>
                </div>

                <button
                    className="btn btn-info--outline mt-3 w-full md:w-20"
                    onClick={handleLogout}
                >
                    登出
                </button>
            </div>

            <div>
                {posts ? (
                    <PostList
                        posts={posts}
                        showForumName={true}
                        cardPosition="profile"
                    />
                ) : null}
            </div>
        </div>
    );
}
