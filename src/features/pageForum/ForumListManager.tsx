import { ReactElement, useState } from "react";

import ForumRankMethodPicker, { RankMethod } from "./ForumRankMethodPicker";
import Pager from "../../components/Pager";
import ListForumHot from "./ListForumHot";
import ListForumNew from "./ListForumNew";

interface ListWrapperProps {
    forumId: number;
    isLogin: boolean;
    rankMethod: RankMethod;
    currentPage: number;
}

const ListWrapper = ({
    forumId,
    rankMethod,
    currentPage,
    isLogin,
}: ListWrapperProps) => {
    if (rankMethod === "hot") {
        return (
            <ListForumHot
                forumId={forumId}
                isLogin={isLogin}
                currentPage={currentPage}
            />
        );
    } else if (rankMethod === "new") {
        return (
            <ListForumNew
                forumId={forumId}
                isLogin={isLogin}
                currentPage={currentPage}
            />
        );
    }
    return <></>;
};

interface Props {
    forumId: number;
    isLogin: boolean;
}

export default function PostManager({ isLogin, forumId }: Props): ReactElement {
    const [rankMethod, setRankMethod] = useState<RankMethod>("hot");
    const [currentPage, setCurrentPage] = useState(0);

    const handleChangeRankMethod = (rankMethod: RankMethod) => {
        setRankMethod(rankMethod);
        setCurrentPage(0);
    };
    const handleChangePage = (direction: 1 | -1) => {
        setCurrentPage(currentPage + direction);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <div className="bg-white p-2 rounded">
                <ForumRankMethodPicker
                    hideAll={isLogin}
                    rankMethod={rankMethod}
                    onChangeMethod={(rankMethod) =>
                        handleChangeRankMethod(rankMethod)
                    }
                />
            </div>

            <div className="mt-1">
                <ListWrapper
                    forumId={forumId}
                    isLogin={isLogin}
                    rankMethod={rankMethod}
                    currentPage={currentPage}
                />
            </div>

            <div className="my-2">
                <Pager
                    hasNextPage={true}
                    hasLastPage={currentPage > 0}
                    onChangePage={(direction) => handleChangePage(direction)}
                />
            </div>
        </>
    );
}
