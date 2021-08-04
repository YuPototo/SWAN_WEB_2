export interface RoutePath {
    path: string;
    basePath: string;
}
export interface RouteDict {
    [index: string]: RoutePath;
}

const routeDict: RouteDict = {
    home: {
        path: "/",
        basePath: "/",
    },
    login: {
        path: "/login",
        basePath: "/login",
    },
    signup: {
        path: "/signup",
        basePath: "/signup",
    },
    submitPost: {
        path: "/submitPost",
        basePath: "/submitPost",
    },
    editPost: {
        path: "/editPost/:postId",
        basePath: "/editPost",
    },
    postPage: {
        path: "/post/:postId",
        basePath: "/post",
    },
    profile: {
        path: "/profile",
        basePath: "/profile",
    },
};

export default routeDict;
