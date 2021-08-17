import { ReactElement } from "react";
import { Link } from "react-router-dom";

import { forums } from "../../data/forums";

export default function ForumRecommendation(): ReactElement {
    return (
        <div className="hidden bg-white rounded md:block">
            <p className="p-3 text-sm text-gray-600">推荐社区</p>
            <ul className="ml-3">
                <li className="mb-3 ml-1">
                    <Link to="/f/4" className="link text-sm flex gap-1">
                        <div className="md:mr-2">
                            <img
                                src={forums[2].icon}
                                alt="icon"
                                className="inline flex-shrink-0 h-6 w-6 rounded-full"
                            />
                        </div>
                        段子
                    </Link>
                </li>
                <li className="mb-1.5 ml-1">
                    <Link to="/f/1" className="link text-sm flex gap-1">
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
                    <Link to="/f/2" className="link text-sm flex gap-1">
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
            </ul>
        </div>
    );
}
