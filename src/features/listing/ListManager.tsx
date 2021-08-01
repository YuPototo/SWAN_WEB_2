import { ReactElement, useState } from "react";

import ListWrapperHot from "./ListWrapperHot";
import ListWrapperNew from "./ListWrapperNew";

import RankMethodPicker, { RankMethod } from "./RankMethodPicker";
import Pager from "./Pager";

export default function PostManager(): ReactElement {
    const [rankMethod, setRankMethod] = useState<RankMethod>("hot");
    const [currentPage, setCurrentPage] = useState(0);

    const handleChangeRankMethod = (rankMethod: RankMethod) => {
        setRankMethod(rankMethod);
        setCurrentPage(0);
    };
    const handleChangePage = (direction: 1 | -1) => {
        setCurrentPage(currentPage + direction);
    };

    return (
        <div>
            <RankMethodPicker
                rankMethod={rankMethod}
                onChangeMethod={(rankMethod) =>
                    handleChangeRankMethod(rankMethod)
                }
            />
            {rankMethod === "hot" ? (
                <ListWrapperHot currentPage={currentPage} />
            ) : rankMethod === "new" ? (
                <ListWrapperNew currentPage={currentPage} />
            ) : null}
            <Pager
                hasNextPage={true}
                hasLastPage={currentPage > 0}
                onChangePage={(direction) => handleChangePage(direction)}
            />
        </div>
    );
}
