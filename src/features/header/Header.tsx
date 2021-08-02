import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
    selectKarma,
    selectUsername,
    selectIsAuthenticated,
    logout,
} from "../auth/authSlice";
import toast from "react-hot-toast";

function Brand(): ReactElement {
    const iconImage = "/watermelon.png";

    return (
        <a href="/" className="flex items-center">
            <img className="mr-2" src={iconImage} alt="brand icon" />
            <span className="text-lg text-gray-700 font-serif">好西瓜</span>
        </a>
    );
}

export default function Header(): ReactElement {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const isLogin = useAppSelector(selectIsAuthenticated);
    const username = useAppSelector(selectUsername);
    const karma = useAppSelector(selectKarma);

    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch(logout());
        toast.success("已登出");
    };

    return (
        <div className="flex px-1 h-12">
            <div className="pl-2 flex">
                <Brand />
            </div>
            <div className="flex-grow"></div>
            <div className="flex gap-2 items-center">
                {isLogin ? (
                    <>
                        <span
                        // className="cursor-pointer"
                        // onClick={() => history.push(`/profile/${username}`)}
                        >
                            {username}
                        </span>
                        <span>({karma})</span>
                        <button
                            className="btn btn-info--outline"
                            onClick={handleLogout}
                        >
                            登出
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-primay--outline"
                            onClick={() => history.push("/login")}
                        >
                            登陆
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => history.push("/signup")}
                        >
                            注册
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
