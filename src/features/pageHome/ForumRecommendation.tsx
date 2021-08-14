import { ReactElement } from "react";

export default function ForumRecommendation(): ReactElement {
    return (
        <div className="hidden bg-white rounded md:block">
            <p className="p-3 text-sm text-gray-600">推荐社区</p>
            <ul className="ml-3">
                <li className="mb-1.5 ml-1">
                    <a href="/f/1" className="link text-sm">
                        新闻
                    </a>
                </li>
                <li className="mb-3 ml-1">
                    <a href="/f/2" className="link text-sm">
                        Python
                    </a>
                </li>
            </ul>
        </div>
    );
}
