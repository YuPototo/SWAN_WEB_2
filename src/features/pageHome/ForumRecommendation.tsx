import { ReactElement } from "react";
import { Link } from "react-router-dom";

import { forums } from "../../data/forums";

export default function ForumRecommendation(): ReactElement {
    return (
        <>
            <p className="p-3 text-green-600">推荐社区</p>
            <ul className="ml-2">
                <li className="mb-1.5 ml-1">
                    <Link
                        to="/f/5"
                        className="text-gray-600 cursor-pointer text-sm flex items-center gap-1 p-1.5 rounded hover:bg-green-100"
                    >
                        <div className="md:mr-2">
                            <img
                                src={forums[3].icon}
                                alt="icon"
                                className="inline flex-shrink-0 h-6 w-6 rounded-full"
                            />
                        </div>
                        极乐世界的征服
                    </Link>
                </li>
                <li className="mb-1.5 ml-1">
                    <Link
                        to="/f/1"
                        className="text-gray-600 cursor-pointer text-sm flex items-center gap-1 p-1.5 rounded hover:bg-green-100"
                    >
                        <div className="md:mr-2">
                            <img
                                src={forums[0].icon}
                                alt="icon"
                                className="inline flex-shrink-0 h-6 w-6 rounded-full"
                            />
                        </div>
                        新闻
                    </Link>
                </li>
                <li className="mb-3 ml-1">
                    <Link
                        to="/f/2"
                        className="text-gray-600 cursor-pointer text-sm flex items-center gap-1 p-1.5 rounded hover:bg-green-100"
                    >
                        <div className="md:mr-2">
                            <img
                                src={forums[1].icon}
                                alt="icon"
                                className="inline flex-shrink-0 h-6 w-6 rounded-full"
                            />
                        </div>
                        Python
                    </Link>
                </li>
                <li className="mb-2 ml-1">
                    <Link
                        to="/f/3"
                        className="text-gray-600 cursor-pointer text-sm flex items-center gap-1 p-1.5 round hover:bg-green-100"
                    >
                        <div className="md:mr-2">
                            <img
                                src={forums[2].icon}
                                alt="icon"
                                className="inline flex-shrink-0 h-6 w-6 rounded-full"
                            />
                        </div>
                        JavaScript
                    </Link>
                </li>
            </ul>
        </>
    );
}
