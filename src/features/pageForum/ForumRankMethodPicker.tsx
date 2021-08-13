import { ReactElement } from "react";
import { HandThumbsUp, LightningCharge } from "react-bootstrap-icons";

export type RankMethod = "hot" | "new";

interface Props {
    hideAll: boolean;
    rankMethod: RankMethod;
    onChangeMethod: (rankMethod: RankMethod) => void;
}

export default function RankMethodPicker({
    rankMethod,
    onChangeMethod,
}: Props): ReactElement {
    const commonCss =
        "pb-1.5 px-0.5 mx-2 hover:text-blue-500 flex items-center";
    const selectedClass = "border-b-2 border-blue-500 text-blue-500";
    const notSelectedClass = "border-b-2 border-white text-gray-500";

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
                <HandThumbsUp size={20} /> <span className="ml-1">热门</span>
            </button>
            <button
                className={newCssClass}
                onClick={() => onChangeMethod("new")}
            >
                <LightningCharge size={20} /> <span className="ml-1">最新</span>
            </button>
        </div>
    );
}
