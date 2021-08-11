import { ReactElement } from "react";

export default function About(): ReactElement {
    return (
        <div className="bg-white rounded px-4 py-6 ">
            <h1 className="text-xl mb-4">关于好西瓜</h1>
            <p className="m-3">好西瓜想成为中国的 Reddit。</p>
            <p className="m-3">
                Reddit
                是一个高度自治的社区，用户自己管理社区，自己决定哪些内容出现各个社区的顶部。好西瓜想成为一个有
                Reddit 氛围的产品。
            </p>

            <p className="m-3">
                你可以在这个页面联系到我：
                <a href="/qinyu" className="link">
                    联系开发者
                </a>
            </p>

            <p className="m-3">
                你可以点击这里返回首页：
                <a href="/" className="link">
                    返回首页
                </a>
            </p>
        </div>
    );
}
