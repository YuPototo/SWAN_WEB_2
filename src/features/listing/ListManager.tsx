import { ReactElement, useState } from "react";

import ListAllHot from "./ListAllHot";
import ListAllNew from "./ListAllNew";
import ListUserHot from "./ListUserHot";
import ListUserNew from "./ListUserNew";

import RankMethodPicker, { RankMethod } from "./RankMethodPicker";
import Pager from "../../components/Pager";

interface ListWrapperProps {
    isLogin: boolean;
    rankMethod: RankMethod;
    currentPage: number;
}

const ListWrapper = ({
    isLogin,
    rankMethod,
    currentPage,
}: ListWrapperProps) => {
    if (isLogin) {
        if (rankMethod === "hot") {
            return <ListUserHot currentPage={currentPage} />;
        } else if (rankMethod === "new") {
            return <ListUserNew currentPage={currentPage} />;
        } else if (rankMethod === "all") {
            return <ListAllHot currentPage={currentPage} isLogin={isLogin} />;
        }
    } else {
        if (rankMethod === "hot") {
            return <ListAllHot currentPage={currentPage} isLogin={isLogin} />;
        } else if (rankMethod === "new") {
            return <ListAllNew currentPage={currentPage} />;
        }
    }
    return <></>;
};

interface Props {
    isLogin: boolean;
}

export default function PostManager({ isLogin }: Props): ReactElement {
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
            <div className="bg-white p-2 mb-3 rounded">
                <RankMethodPicker
                    hideAll={isLogin}
                    rankMethod={rankMethod}
                    onChangeMethod={(rankMethod) =>
                        handleChangeRankMethod(rankMethod)
                    }
                />
            </div>

            <div className="mt-1 min-h-screen">
                <ListWrapper
                    isLogin={isLogin}
                    rankMethod={rankMethod}
                    currentPage={currentPage}
                />
            </div>

            <div className="my-3">
                <Pager
                    hasNextPage={true}
                    hasLastPage={currentPage > 0}
                    onChangePage={(direction) => handleChangePage(direction)}
                />
            </div>
        </>
    );
}
