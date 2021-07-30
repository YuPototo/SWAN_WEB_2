import { ReactElement } from "react";

export default function Brand(): ReactElement {
    const iconImage = "/watermelon.png";

    return (
        <a href="/" className="flex items-center">
            <img className="mr-2" src={iconImage} alt="brand icon" />
            <span className="text-lg text-gray-700 font-serif">好西瓜</span>
        </a>
    );
}
