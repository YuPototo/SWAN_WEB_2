import { ReactElement } from "react";
import {
    HandThumbsUp,
    HandThumbsUpFill,
    LightningCharge,
    LightningChargeFill,
    Diamond,
    DiamondFill,
} from "react-bootstrap-icons";

export type RankMethod = "hot" | "new" | "all";

interface Props {
    hideAll: boolean;
    rankMethod: RankMethod;
    onChangeMethod: (rankMethod: RankMethod) => void;
}

export default function RankMethodPicker({
    hideAll,
    rankMethod,
    onChangeMethod,
}: Props): ReactElement {
    const commonCss =
        "flex items-center px-1.5 py-0.5 mx-2 rounded-full border border-white hover:text-green-500 hover:bg-green-50 hover:border-green-50";
    const selectedClass =
        "text-green-500 border-green-50 bg-green-50 font-medium";
    const notSelectedClass = "text-gray-500";

    const hotCssClass =
        rankMethod === "hot"
            ? selectedClass + " " + commonCss
            : notSelectedClass + " " + commonCss;

    const hotIcon =
        rankMethod === "hot" ? (
            <HandThumbsUpFill className="icon text-green-400" />
        ) : (
            <HandThumbsUp className="icon " />
        );

    const newCssClass =
        rankMethod === "new"
            ? selectedClass + " " + commonCss
            : notSelectedClass + " " + commonCss;

    const newIcon =
        rankMethod === "new" ? (
            <LightningChargeFill className="icon text-green-400" />
        ) : (
            <LightningCharge className="icon" />
        );

    const allCssClass =
        rankMethod === "all"
            ? selectedClass + " " + commonCss
            : notSelectedClass + " " + commonCss;

    const allSiteIcon =
        rankMethod === "all" ? (
            <DiamondFill className="icon text-green-400" />
        ) : (
            <Diamond className="icon" />
        );

    return (
        <div className="ml-3 flex gap-2">
            <button
                className={hotCssClass}
                onClick={() => onChangeMethod("hot")}
            >
                {hotIcon}
                <span className="ml-1">热门</span>
            </button>
            <button
                className={newCssClass}
                onClick={() => onChangeMethod("new")}
            >
                {newIcon}
                <span className="ml-1">最新</span>
            </button>
            {hideAll ? (
                <button
                    className={allCssClass}
                    onClick={() => onChangeMethod("all")}
                >
                    {allSiteIcon}
                    <span className="ml-1">全站</span>
                </button>
            ) : null}
        </div>
    );
}
