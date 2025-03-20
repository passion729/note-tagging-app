import { FaRegQuestionCircle, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const TagButton = ({ value, onChange }: Props) => {
    return (
        <div className="flex items-center space-x-2 h-full">
            <label className="flex items-center cursor-pointer flex-auto h-full">
                <input type="radio" value="disagree" className="hidden peer"
                       checked={value === "disagree"}
                       onChange={(event) => onChange(event.target.value)} />
                <div className="p-2 rounded-lg flex-auto h-full
                content-center justify-items-center btn bg-gray-500 peer-checked:bg-red-400">
                    <FaRegThumbsDown className="accent-black" />
                </div>
            </label>

            <label className="flex items-center cursor-pointer flex-auto h-full">
                <input type="radio" value="neutral" className="hidden peer"
                       checked={value === "neutral"}
                       onChange={(event) => onChange(event.target.value)} />
                <div className="p-2 rounded-lg flex-auto h-full
                content-center justify-items-center btn bg-gray-500 peer-checked:bg-blue-400">
                    <FaRegQuestionCircle />
                </div>
            </label>

            <label className="flex items-center cursor-pointer flex-auto h-full">
                <input type="radio" value="agree" className="hidden peer"
                       checked={value === "agree"}
                       onChange={(event) => onChange(event.target.value)} />
                <div className="p-2 rounded-lg flex-auto h-full
                    content-center justify-items-center btn bg-gray-500 peer-checked:bg-green-400">
                    <FaRegThumbsUp />
                </div>
            </label>
        </div>
    );
};

export default TagButton;