import { ReactElement } from "react";

export type RankMethod = "hot" | "new";

interface Props {
    rankMethod: RankMethod;
    onChangeMethod: (rankMethod: RankMethod) => void;
}

export default function RankMethodPicker({
    rankMethod,
    onChangeMethod,
}: Props): ReactElement {
    const commonCss = "pb-0.5 px-0.5 mx-2 hover:text-blue-500";
    const selectedClass = "border-b-2 border-blue-500";
    const notSelectedClass = "border-b-2 border-white";
    const hotCssClass =
        rankMethod === "hot"
            ? selectedClass + " " + commonCss
            : notSelectedClass + " " + commonCss;
    const newCssClass =
        rankMethod === "new"
            ? selectedClass + " " + commonCss
            : notSelectedClass + " " + commonCss;

    return (
        <div className="ml-3 flex gap-2">
            <button
                className={hotCssClass}
                onClick={() => onChangeMethod("hot")}
            >
                热门
            </button>
            <button
                className={newCssClass}
                onClick={() => onChangeMethod("new")}
            >
                最新
            </button>
        </div>
    );
}
