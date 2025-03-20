import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const NoteSwitcher = () => {
    return (
        <div className="flex flex-row space-x-6 w-auto">
            <div className="flex flex-row space-x-2 w-l">
                <div className="btn btn-soft grow rounded-lg">
                    <FaArrowLeftLong />
                </div>
                <div className="self-center">
                    <p>1 / 10</p>
                </div>
                <div className="btn btn-soft grow rounded-box">
                    <FaArrowRightLong />
                </div>
            </div>
            <button className="btn btn-soft grow rounded-lg">
                提交
            </button>
        </div>

    );
};

export default NoteSwitcher;