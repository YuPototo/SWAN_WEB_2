import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function TalkToMe(): ReactElement {
    return (
        <div className="bg-white rounded px-4 py-6 ">
            <p className="m-4">你好，我是好西瓜的开发者，覃煜，😊</p>
            <p className="m-4">
                如果你有任何建议，可以给我发邮件：
                <a href="mailto:sirius.qinyu@gamil.com">
                    sirius.qinyu@gmail.com
                </a>
            </p>
            <p className="m-4">
                如果你更喜欢即时交流，可以添加我微信：HaoXiGua2021
            </p>
            <p className="m-4">
                你可以点击这里返回首页：
                <Link to="/" className="link">
                    返回首页
                </Link>
            </p>
        </div>
    );
}
