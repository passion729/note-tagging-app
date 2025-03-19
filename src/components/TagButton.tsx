import { FaRegQuestionCircle, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

const TagButton = () => {
    return (
        <div className="flex gap-4 w-1/2">
            <div className="btn btn-primary flex-auto">
                <FaRegThumbsDown />
            </div>
            <div className="btn btn-primary flex-auto">
                <FaRegQuestionCircle />
            </div>
            <div className="btn btn-primary flex-auto">
                <FaRegThumbsUp />
            </div>
        </div>
    );
};

export default TagButton;