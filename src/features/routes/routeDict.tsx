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
    talkToMe: {
        path: "/qinyu",
        basePath: "/qinyu",
    },
    about: {
        path: "/about",
        basePath: "/about",
    },
    privacy: {
        path: "/privacy",
        basePath: "/privacy",
    },
    userTerms: {
        path: "/userTerms",
        basePath: "/userTerms",
    },
    forum: {
        path: "/f/:forumId",
        basePath: "/f",
    },
};

export default routeDict;
