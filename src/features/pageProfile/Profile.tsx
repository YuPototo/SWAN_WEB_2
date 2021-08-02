// 先不实现 profile 页面

import { ReactElement } from "react";
import { useParams } from "react-router-dom";

import { useGetUserInfoByIdQuery } from "../../app/services/user";

export default function Profile(): ReactElement {
    const { userId: userIdString } = useParams<{ userId: string }>();
    const userId = parseInt(userIdString);

    const { data: user } = useGetUserInfoByIdQuery(userId);

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

            <div>{/* <UserPostsContainer userId={userId} /> */}</div>
        </div>
    );
}
