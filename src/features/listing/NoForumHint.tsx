import React, { ReactElement } from "react";

export default function NoForumHint(): ReactElement {
    return (
        <div className="bg-white p-3">
            <h2 className="mb-2">你还没有加入社区</h2>

            <p className="text-sm">下面是本站的活跃社区</p>
            <ul className="ml-3 mt-3">
                <li className="mb-2">
                    <a href="/f/1" className="link ">
                        新闻
                    </a>
                </li>
                <li className="mb-2">
                    <a href="/f/2" className="link">
                        Python
                    </a>
                </li>
            </ul>
        </div>
    );
}
