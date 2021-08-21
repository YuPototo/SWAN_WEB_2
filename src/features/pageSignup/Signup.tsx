import React, { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { useSignupMutation } from "../../app/services/auth";
import analytics from "../../analytics/analytics";

const checkUsernameError = (username: string): string | void => {
    if (username.length < 3) {
        return "长度不能小于3";
    }
    if (username.includes(" ")) {
        return "不能包含空格";
    }
};
const checkPasswordError = (password: string): string | void => {
    if (password.length < 7) {
        return "长度不能小于7";
    }
    if (password.includes(" ")) {
        return "不能包含空格";
    }
};

export default function Signup(): ReactElement {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const history = useHistory();

    const [signup, { isLoading }] = useSignupMutation();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // 校验
        const usernameError = checkUsernameError(username);
        if (usernameError) {
            setUsernameError(usernameError);
        }
        const passwordError = checkPasswordError(password);
        if (passwordError) {
            setPasswordError(passwordError);
        }

        if (usernameError || passwordError) {
            return;
        }

        const loadingToastId = toast.loading("等待中...");
        try {
            const data = await signup({ username, password }).unwrap();
            localStorage.setItem("user", JSON.stringify(data));
            toast.success(`欢迎，${data.user.username}`);
            analytics.sendEvent({ category: "user", action: "signup" });
            setTimeout(() => {
                history.push("/");
            }, 1500);
        } catch (err) {
            toast.error(err.data?.message);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    return (
        <div className="bg-white py-4 px-8">
            <h1 className="text-lg my-5">创建账号</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center">
                    <label htmlFor="username">账号</label>
                    <input
                        className="text-input md:w-60"
                        id="username"
                        name="username"
                        value={username}
                        placeholder="输入用户名"
                        autoFocus
                        disabled={isLoading}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    {usernameError !== "" ? (
                        <p className="text-red-500 text-sm italic">
                            {usernameError}
                        </p>
                    ) : null}
                </div>
                <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center">
                    <label className="" htmlFor="password">
                        密码
                    </label>
                    <input
                        className="text-input md:w-60"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="输入密码"
                        disabled={isLoading}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {passwordError !== "" ? (
                        <p className="text-red-500 text-sm italic">
                            {passwordError}
                        </p>
                    ) : null}
                </div>

                <div className="mb-3">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        创建账号
                    </button>
                </div>
                <div className="my-2 text-gray-400 text-sm">
                    创建账号视为同意
                    <Link to="/privacy">《好西瓜隐私协议》</Link> 和
                    <Link to="/userTerms">《好西瓜用户协议》</Link>
                </div>
                <div>
                    已有账号？去
                    <span
                        className="link"
                        onClick={() => history.push("/login")}
                    >
                        登录
                    </span>
                </div>
            </form>
        </div>
    );
}
