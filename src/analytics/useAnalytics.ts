import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import analytics from "./analytics";
import pagePaths, { RoutePath } from "../features/routes/routeDict";

const pagePathValues = Object.values(pagePaths);

export const getStringBeforeLastSlash = (path: string): string => {
    if (path === "/") return path;

    const splitedPath = path.split("/");

    if (splitedPath[splitedPath.length - 1] === "") {
        throw new Error("Path 不能以 / 结尾，除了 home 之外");
    }

    if (splitedPath.length === 2) {
        return path;
    } else if (splitedPath.length > 2) {
        splitedPath.pop();
        return splitedPath.join("/");
    } else {
        throw new Error("Path 似乎没有包含 /");
    }
};

export function currentPathToBasePath(
    currentPath: string,
    pagePaths: RoutePath[]
): string {
    const baseStringInPath = getStringBeforeLastSlash(currentPath);
    const index = pagePaths.findIndex((item) => {
        return item.basePath === baseStringInPath;
    });
    if (index >= 0) {
        return pagePaths[index].basePath;
    } else {
        throw new Error("找不到这个 path");
    }
}

export default function useGoogleAnalytics() {
    const location = useLocation();

    useEffect(() => {
        analytics.init();
    }, []);

    useEffect(() => {
        const currentPath = location.pathname;
        const basepath = currentPathToBasePath(currentPath, pagePathValues);
        analytics.sendPageview(basepath);
    }, [location]);
}
