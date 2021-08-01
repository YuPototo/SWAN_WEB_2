import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import toast from "react-hot-toast";

import PostManager from "../listing/ListManager";
import { selectIsAuthenticated } from "../auth/authSlice";

export default function Home(): ReactElement {
    const history = useHistory();
    const isLogin = useAppSelector(selectIsAuthenticated);

    const handleShare = () => {
        if (!isLogin) {
            toast("未登陆，请先创建账号😊");
            setTimeout(() => {
                history.push("/signup");
            }, 1500);
        } else {
            history.push("/submitPost");
        }
    };

    return (
        <div className="flex flex-col justify-center md:flex-row md:gap-3">
            <div className="rounded	bg-white pl-10 p-3 mb-3 md:order-1 md:h-full md:p-3 md:text-center">
                <p className="text-gray-700 mb-2">有想要分享的内容吗？</p>
                <button
                    className="btn btn-primay--outline"
                    onClick={handleShare}
                >
                    发布一个链接
                </button>
            </div>
            <PostManager />
        </div>
    );
}
