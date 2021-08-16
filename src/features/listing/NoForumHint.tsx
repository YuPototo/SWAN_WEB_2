import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function NoForumHint(): ReactElement {
    return (
        <div className="bg-white p-3">
            <h2 className="mb-2">你还没有加入社区</h2>

            <p className="text-sm">下面是本站的活跃社区</p>
            <ul className="ml-3 mt-3">
                <li className="mb-2">
                    <Link to="/f/1" className="link ">
                        新闻
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/f/2" className="link">
                        Python
                    </Link>
                </li>
            </ul>
        </div>
    );
}
