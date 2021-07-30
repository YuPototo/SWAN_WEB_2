interface Author {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: Author;
}

export interface Listing {
    posts: Post[];
}
