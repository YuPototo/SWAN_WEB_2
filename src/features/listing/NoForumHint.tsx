import { ReactElement } from "react";
import { Link } from "react-router-dom";

import { forums } from "../../data/forums";

export default function NoForumHint(): ReactElement {
    return (
        <div className="bg-white p-4 ">
            <h2 className="mb-2 text-lg text-green-600">你还没有加入社区</h2>

            <p className="text-gray-800 ml-2 mt-3">推荐本站的活跃社区</p>
            <ul className="ml-4 mt-3">
                <li className="mb-2">
                    <Link
                        to="/f/4"
                        className="p-1.5 rouended flex gap-2 items-center link hover:bg-green-50"
                    >
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
                    <Link
                        to="/f/1"
                        className="p-1.5 rouended  flex gap-2 items-center link hover:bg-green-50"
                    >
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
                    <Link
                        to="/f/2"
                        className="p-1.5 rouended flex gap-2 items-center link hover:bg-green-50"
                    >
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
