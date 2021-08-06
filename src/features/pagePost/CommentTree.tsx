import React, { ReactElement } from "react";
import CommentCard from "./CommentCard";

import { CommentTree as ICommentTree } from "../../types/types";

interface Props {
    commentTree: ICommentTree;
}

export default function CommentTree({ commentTree }: Props): ReactElement {
    return (
        <div>
            {commentTree.map((commentTreeNode) => (
                <CommentCard
                    key={commentTreeNode.id}
                    comment={commentTreeNode}
                />
            ))}
        </div>
    );
}
