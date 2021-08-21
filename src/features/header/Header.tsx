import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { Pencil, PersonCircle } from "react-bootstrap-icons";

import {
    //selectKarma,
    selectUsername,
    selectIsAuthenticated,
} from "../auth/authSlice";

function Brand(): ReactElement {
    const iconImage = "/watermelon.png";

    return (
        <Link to="/" className="flex items-center">
            <img className="mr-2" src={iconImage} alt="brand" />
            <span className="text-gray-600">好西瓜</span>
        </Link>
    );
}

export default function Header(): ReactElement {
    const history = useHistory();

    const isLogin = useAppSelector(selectIsAuthenticated);
    const username = useAppSelector(selectUsername);

    return (
        <div className="flex px-3 h-12">
            <div className="pl-2 flex">
                <Brand />
            </div>
            <div className="flex-grow"></div>

            <div className="flex gap-2 items-center">
                {isLogin ? (
                    <>
                        <span
                            className="text-sm mr-2 text-gray-700 cursor-pointer flex items-center gap-1"
                            onClick={() => history.push(`/profile`)}
                        >
                            <PersonCircle className="icon text-gray-500" />
                            {username}
                        </span>
                        <button
                            className="flex btn-sm btn-primary--outline items-center gap-1 md:hidden "
                            onClick={() => history.push("/submitPost")}
                        >
                            <Pencil />
                            发帖
                        </button>
                        {/* <span className="text-sm text-gray-700">({karma})</span> */}
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-primary--outline"
                            onClick={() => history.push("/login")}
                        >
                            登录
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
