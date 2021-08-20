import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import toast from "react-hot-toast";
import { selectIsAuthenticated } from "../auth/authSlice";
import { Link } from "react-router-dom";
import { Pencil } from "react-bootstrap-icons";

import ListManager from "../listing/ListManager";
import ForumRecommendation from "./ForumRecommendation";

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
            className="md:grid md:gap-3"
            style={{
                gridTemplateRows: "auto auto auto auto",
                gridTemplateColumns: "68% 32%",
            }}
        >
            <div className="h-full md:col-start-1 md:row-start-1 md:row-span-2">
                <ListManager isLogin={isLogin} />
            </div>
            <div className="">
                <div className="hidden md:block md:bg-white md:p-5 md:mb-4 md:rounded">
                    <p className="text-gray-600 mb-4">有想要分享的内容？</p>
                    <button
                        className="btn btn-primary--outline w-full flex justify-center items-center gap-2"
                        onClick={handleShare}
                    >
                        <Pencil className="icon" />
                        <span>发布帖子</span>
                    </button>
                </div>
                <div className="hidden md:block md:bg-white md:rounded md:p-3">
                    <ForumRecommendation />
                </div>
            </div>

            <div className="mt-5 pb-3 text-sm flex gap-3 justify-center text-gray-400 md:row-start-3">
                <Link to="/qinyu">联系开发者</Link>
                <Link to="/about">关于好西瓜</Link>
                <Link to="/privacy">隐私协议</Link>
                <Link to="/userTerms">用户协议</Link>
            </div>
        </div>
    );
}
