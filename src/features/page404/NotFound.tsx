import { ReactElement } from "react";
import { useHistory } from "react-router";

import pagePaths from "../routes/routeDict";

export default function NotFound(): ReactElement {
    const history = useHistory();
    return (
        <div className="bg-white py-4 px-8">
            <h1 className="text-2xl">404</h1>
            <p className="my-2">这里什么也没有</p>
            <button
                className="btn btn-primary"
                onClick={() => history.push(pagePaths.home.basePath)}
            >
                回到首页
            </button>
        </div>
    );
}
