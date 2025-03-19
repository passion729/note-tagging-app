import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const NoteSwitcher = () => {
    return (
        <div className="flex space-x-2 w-1/3">
            <div className="btn btn-soft flex-auto">
                <FaArrowLeftLong />
            </div>
            <div className="btn btn-soft flex-auto">
                <FaArrowRightLong />
            </div>
        </div>
    );
};

export default NoteSwitcher;