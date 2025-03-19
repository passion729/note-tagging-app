import { FaRegQuestionCircle, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

const TagButton = () => {
    return (
        <div className="flex items-center space-x-2 h-full">
            <label className="flex items-center cursor-pointer flex-auto h-full">
                <input type="radio" name="option" className="hidden peer" />
                <div className="p-2 rounded-lg flex-auto h-full
                content-center justify-items-center bg-gray-500 peer-checked:bg-red-400">
                    <FaRegThumbsDown />
                </div>
            </label>

            <label className="flex items-center cursor-pointer flex-auto h-full">
                <input type="radio" name="option" className="hidden peer" />
                <div className="p-2 rounded-lg flex-auto h-full
                content-center justify-items-center bg-gray-500 peer-checked:bg-blue-400">
                    <FaRegQuestionCircle />
                </div>
            </label>

            <label className="flex items-center cursor-pointer flex-auto h-full">
                <input type="radio" name="option" className="hidden peer" />
                <div className="p-2 rounded-lg flex-auto h-full
                    content-center justify-items-center bg-gray-500 peer-checked:bg-green-400">
                    <FaRegThumbsUp />
                </div>
            </label>
        </div>

    );
};

export default TagButton;