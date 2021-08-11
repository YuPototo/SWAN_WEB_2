import { ReactElement } from "react";

export default function About(): ReactElement {
    return (
        <div className="bg-white rounded px-4 py-6 ">
            <h1 className="text-xl my-4">好西瓜隐私协议</h1>

            <h2 className="my-2">1.1 个人信息搜集</h2>

            <p className="m-2">
                好西瓜使用 Google Analytics 做数据统计，好西瓜无法把 Google
                Analytics 的数据与个人信息配对。
            </p>

            <h2 className="my-2">1.2 产品使用信息搜集</h2>

            <p className="m-2">
                如果您注册了账号，好西瓜会记录您账号的发帖、回复、点赞、点踩记录。
            </p>

            <p className="m-2">
                当您删除帖子、取消点赞和点踩后，对应的记录也会被删除。
            </p>

            <p className="m-2">
                当您删除回复后，回复的文本内容会被修改为一个长度为0的字符串，但并不会删除数据库里的回复条目，因为该回复的子回复需要
                parent 字段。
            </p>

            <p className="mt-10">
                你可以点击这里返回首页：
                <a href="/" className="link">
                    返回首页
                </a>
            </p>
        </div>
    );
}
