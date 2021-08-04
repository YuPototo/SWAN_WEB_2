// 先不实现 profile 页面

import { ReactElement } from "react";
import { useAppSelector } from "../../app/hooks";
import {
    useGetUserInfoByIdQuery,
    useGetUserPostsQuery,
} from "../../app/services/user";
import { selectUserId } from "../auth/authSlice";
import PostList from "../listing/PostList";

export default function Profile(): ReactElement {
    const userId = useAppSelector(selectUserId) as number; // 技术债
    const { data: user } = useGetUserInfoByIdQuery(userId);
    const { data: posts } = useGetUserPostsQuery(userId);

    return (
        <div>
            <div className="p-4 bg-white rounded">
                <div className="mb-2">
                    <span className="text-gray-600">用户名 </span>
                    <span>{user?.username}</span>
                </div>
                <div>
                    <span className="text-gray-600">积分 </span>
                    <span>{user?.postKarma}</span>
                </div>
            </div>

            <div>{posts ? <PostList posts={posts} /> : null}</div>
        </div>
    );
}
