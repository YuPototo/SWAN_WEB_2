import { ReactElement, useState, useEffect } from "react";
import { useGetNewListingQuery } from "../../app/services/listing";

import { useGetVotesMutation } from "../../app/services/vote";
import { useAppSelector } from "../../app/hooks";

import { selectIsAuthenticated } from "../auth/authSlice";

import PostList from "./PostList";

import type { PostInCard } from "../postCard/PostCard";

interface Props {
    currentPage: number;
}

export default function ListNewWrapper({ currentPage }: Props): ReactElement {
    const [postInCards, setPostInCards] = useState<PostInCard[]>([]);

    const { data: posts, isLoading: isLoadingPost } =
        useGetNewListingQuery(currentPage);
    const [getVotes, ,] = useGetVotesMutation();

    const isLogin = useAppSelector(selectIsAuthenticated);

    // 获取用户对这些 post 的投票情况，比较丑陋，以后再改。
    useEffect(() => {
        if (!isLogin) return;
        if (isLoadingPost) return;
        if (!posts) return;

        const tempPosts: PostInCard[] = [];
        for (const post of posts) {
            tempPosts.push({ ...post, userVote: undefined });
        }
        const postIds = posts?.map((post) => post.id);
        getVotes({ postIds })
            .unwrap()
            .then((data) => {
                data.forEach((voteRecord) => {
                    const index = tempPosts.findIndex(
                        ({ id }) => id === voteRecord.postId
                    );
                    if (index < 0) return;
                    tempPosts[index].userVote = voteRecord.direction;
                });
                setPostInCards(tempPosts);
            })
            .catch((err) => console.log(err));
    }, [isLogin, isLoadingPost, currentPage, posts, getVotes]);

    if (!posts) {
        return <div>no posts</div>;
    }
    return (
        <div>
            <PostList posts={postInCards} />
        </div>
    );
}
