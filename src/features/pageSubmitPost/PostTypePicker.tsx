import { ReactElement } from "react";
import { FileEarmarkText, Link45deg } from "react-bootstrap-icons";

export type PostType = "URL" | "SELF_POST";

interface Props {
    postType: PostType;
    onChangePostType: (postType: PostType) => void;
}

export default function PostTypePicker({
    postType,
    onChangePostType,
}: Props): ReactElement {
    const commonCss =
        "flex items-center px-1.5 py-0.5 mx-2 rounded-full border border-white hover:text-green-500 hover:bg-green-50 hover:border-green-50";
    const selectedClass =
        "text-green-500 border-green-50 bg-green-50 font-medium";
    const notSelectedClass = "text-gray-500";

    const urlCssClass =
        postType === "URL"
            ? selectedClass + " " + commonCss
            : notSelectedClass + " " + commonCss;

    const selfPostCssClass =
        postType === "SELF_POST"
            ? selectedClass + " " + commonCss
            : notSelectedClass + " " + commonCss;

    return (
        <div className="ml-3 flex gap-2">
            <button
                className={selfPostCssClass}
                onClick={() => onChangePostType("SELF_POST")}
            >
                <FileEarmarkText className="icon" />
                <span className="pl-1">帖子</span>
            </button>
            <button
                className={urlCssClass}
                onClick={() => onChangePostType("URL")}
            >
                <Link45deg className="icon" />
                <span className="pl-1">链接</span>
            </button>
        </div>
    );
}
