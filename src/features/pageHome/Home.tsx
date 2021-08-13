import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import toast from "react-hot-toast";

import ListManager from "../listing/ListManager";
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
        <div
            className="md:grid md:gap-2"
            style={{
                gridTemplateRows: "auto auto auto",
                gridTemplateColumns: "68% 32%",
            }}
        >
            <div className="rounded bg-white p-4 mb-4 md:mb-0 md:col-start-2">
                <p className="text-gray-700 mb-2">有想要分享的内容吗？</p>
                <button
                    className="btn btn-primay--outline"
                    onClick={handleShare}
                >
                    发布一个内容
                </button>
            </div>
            <div className="h-full md:col-start-1 md:row-span-full">
                <ListManager isLogin={isLogin} />
            </div>
            <div className="p-2 text-sm flex gap-3 justify-center pb-4 text-gray-600 md:bg-white md:col-start-2 md:row-start-2 md:rounded md:flex-col md:p-4">
                <a href="/qinyu">联系开发者</a>
                <a href="/about">关于好西瓜</a>
                <a href="/privacy">隐私协议</a>
                <a href="/userTerms">用户协议</a>
            </div>
        </div>
    );
}
