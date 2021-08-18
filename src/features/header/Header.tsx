import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import {
    //selectKarma,
    selectUsername,
    selectIsAuthenticated,
} from "../auth/authSlice";

function Brand(): ReactElement {
    const iconImage = "/watermelon.png";

    return (
        <Link to="/" className="flex items-center">
            <img className="mr-2" src={iconImage} alt="brand icon" />
            <span className="text-gray-700 font-serif">好西瓜</span>
        </Link>
    );
}

export default function Header(): ReactElement {
    const history = useHistory();

    const isLogin = useAppSelector(selectIsAuthenticated);
    const username = useAppSelector(selectUsername);
    // const karma = useAppSelector(selectKarma);

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
                            className="text-sm mr-2 text-gray-700 cursor-pointer"
                            onClick={() => history.push(`/profile`)}
                        >
                            {username}
                        </span>
                        {/* <span className="text-sm text-gray-700">({karma})</span> */}
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
