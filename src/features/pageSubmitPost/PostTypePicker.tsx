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
    const commonCss = "pb-2 px-0.5 mx-2 hover:text-blue-500 flex items-center";
    const selectedClass = "border-b-2 border-blue-500 text-blue-500";
    const notSelectedClass = "border-b-2 border-white text-gray-500";
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
                <FileEarmarkText size={23} /> <span className="pl-1">帖子</span>
            </button>
            <button
                className={urlCssClass}
                onClick={() => onChangePostType("URL")}
            >
                <Link45deg size={25} /> <span className="pl-1">链接</span>
            </button>
        </div>
    );
}
