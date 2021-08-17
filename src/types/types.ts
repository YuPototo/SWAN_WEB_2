interface Author {
    id: number;
    name: string;
}

type POST_TYPE = "URL" | "SELF_POST";

interface Forum {
    id: number;
    name: string;
}
export interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    score: number;
    commentCount: number;
    postType: POST_TYPE;
    isPinned: boolean;
    author: Author;
    forum: Forum;
}

export interface Listing {
    posts: Post[];
}

export interface Comment {
    id: number;
    postId: number;
    body: string;
    depth: number;
    parentId?: number;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    author: Author;
}

export interface CommentTreeNode extends Comment {
    children: CommentTree;
}

export type CommentTree = CommentTreeNode[];
