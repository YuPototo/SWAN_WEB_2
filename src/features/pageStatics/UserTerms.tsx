import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function About(): ReactElement {
    return (
        <div className="bg-white rounded px-4 py-6 ">
            <h1 className="text-xl my-4">好西瓜用户协议</h1>

            <h2 className="my-2">1.1 使用规则</h2>

            <p className="m-2">
                1.1.1
                用户注册成功后，好西瓜将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。
            </p>

            <p className="m-2">
                1.1.2 用户不得冒充他人；不得利用他人的名义发布任何信息。
            </p>

            <p className="m-2">
                1.1.3
                用户承诺不得以任何方式利用好西瓜直接或间接从事违反中国法律以及社会公德的行为，好西瓜有权对违反上述承诺的内容予以删除。
            </p>

            <p className="m-2">
                1.1.4
                用户不得利用好西瓜服务制作、发布、传播或者转载如下内容：反对宪法所确定的基本原则的；危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；损害国家荣誉和利益的；煽动民族仇恨、民族歧视，破坏民族团结的；侮辱、滥用英烈形象，否定英烈事迹，美化粉饰侵略战争行为的；破坏国家宗教政策，宣扬邪教和封建迷信的；散布谣言，扰乱社会秩序，破坏社会稳定的；散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；侮辱或者诽谤他人，侵害他人合法权益的；含有法律、行政法规禁止的其他内容的信息。
            </p>

            <p className="mt-10">
                你可以点击这里返回首页：
                <Link to="/" className="link">
                    返回首页
                </Link>
            </p>
        </div>
    );
}
