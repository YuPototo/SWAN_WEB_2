import { ReactElement } from "react";

interface Props {
    hasLastPage: boolean;
    hasNextPage?: boolean;
    onChangePage: (direction: 1 | -1) => void;
}

export default function Pager({
    hasNextPage,
    hasLastPage,
    onChangePage,
}: Props): ReactElement {
    return (
        <div className="flex gap-2 justify-between mx-4">
            {hasLastPage ? (
                <button
                    className="btn btn-primary--outline"
                    onClick={() => onChangePage(-1)}
                >
                    上一页
                </button>
            ) : (
                <div></div>
            )}

            {hasNextPage ? (
                <button
                    className="btn btn-primary"
                    onClick={() => onChangePage(1)}
                >
                    下一页
                </button>
            ) : null}
        </div>
    );
}
