interface Author {
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
    author: Author;
}

export interface Listing {
    posts: Post[];
}
