import { ReactElement } from "react";
import { Link } from "react-router-dom";

import { forums } from "../../data/forums";

export default function NoForumHint(): ReactElement {
    return (
        <div className="bg-white p-3">
            <h2 className="mb-2">你还没有加入社区</h2>

            <p className="text-sm">推荐本站的活跃社区</p>
            <ul className="ml-3 mt-3">
                <li className="mb-2">
                    <Link to="/f/4" className="flex gap-2 items-center link">
                        <div className="md:mr-2">
                            <img
                                src={forums[2].icon}
                                alt="icon"
                                className="inline flex-shrink-0 h-7 w-7 rounded-full"
                            />
                        </div>
                        段子
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/f/1" className="flex gap-2 items-center link">
                        <div className="md:mr-2">
                            <img
                                src={forums[0].icon}
                                alt="icon"
                                className="inline flex-shrink-0 h-7 w-7 rounded-full"
                            />
                        </div>
                        新闻
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/f/2" className="flex gap-2 items-center link">
                        <div className="md:mr-2">
                            <img
                                src={forums[1].icon}
                                alt="icon"
                                className="inline flex-shrink-0 h-7 w-7 rounded-full"
                            />
                        </div>
                        Python
                    </Link>
                </li>
            </ul>
        </div>
    );
}
