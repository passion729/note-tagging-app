import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const NoteSwitcher = () => {
    return (
        <div className="flex flex-row space-x-2 w-1/5">
            <div className="btn btn-soft grow">
                <FaArrowLeftLong />
            </div>
            <div className="self-center">
                <p>1 / 10</p>
            </div>
            <div className="btn btn-soft grow">
                <FaArrowRightLong />
            </div>
        </div>
    );
};

export default NoteSwitcher;