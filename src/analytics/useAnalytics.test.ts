import {
    currentPathToBasePath,
    getStringBeforeLastSlash,
} from "./useAnalytics";
import type { RouteDict } from "../features/routes/routeDict";

const testPagePaths: RouteDict = {
    home: {
        path: "/",
        basePath: "/",
    },
    login: {
        path: "/login",
        basePath: "/login",
    },
    post: {
        path: "/post/:postId",
        basePath: "/post",
    },
};

const testPagePathValues = Object.values(testPagePaths);
console.log(testPagePathValues);

describe("currentPathToBasePath()", () => {
    it("should return the right base paths", () => {
        const basePath1 = currentPathToBasePath("/", testPagePathValues);
        expect(basePath1).toBe("/");

        const basePath2 = currentPathToBasePath("/login", testPagePathValues);
        expect(basePath2).toBe("/login");

        const basePath3 = currentPathToBasePath("/post/30", testPagePathValues);
        expect(basePath3).toBe("/post");
    });
});

describe("getStringBeforeLastSlash()", () => {
    it("should return string before last slash", () => {
        expect(getStringBeforeLastSlash("/")).toBe("/");
        expect(getStringBeforeLastSlash("/login")).toBe("/login");
        expect(getStringBeforeLastSlash("/users/30")).toBe("/users");
    });

    it("should throw error when no slash", () => {
        expect(() => {
            getStringBeforeLastSlash("");
        }).toThrow();
    });

    it("slash at the end is not allowed", () => {
        expect(() => {
            getStringBeforeLastSlash("/users/30/");
        }).toThrow();
    });
});
