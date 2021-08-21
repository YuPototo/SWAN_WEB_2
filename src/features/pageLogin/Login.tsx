import React, { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

import { useLoginMutation } from "../../app/services/auth";
import analytics from "../../analytics/analytics";

export default function Signup(): ReactElement {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // 校验

        const loadingToastId = toast.loading("等待中...");
        try {
            const data = await login({ username, password }).unwrap();
            toast.success(`欢迎，${data.user.username}`);
            localStorage.setItem("user", JSON.stringify(data));
            analytics.sendEvent({ category: "user", action: "login" });
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
            <h1 className="text-lg my-5">登录</h1>
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
                </div>
                <div className="mb-3">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        登录
                    </button>
                </div>
                <div>
                    没有账号？去
                    <span
                        className="link"
                        onClick={() => history.push("/signup")}
                    >
                        注册
                    </span>
                </div>
            </form>
        </div>
    );
}
