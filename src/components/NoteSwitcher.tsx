import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

interface Props {
    previousNoteHandler: () => void;
    nextNoteHandler: () => void;
    submitHandler: () => void;
    currentId: number;
    totalNum: number;
}

const NoteSwitcher = ({ previousNoteHandler, nextNoteHandler, submitHandler, currentId, totalNum }: Props) => {
    return (
        <div className="flex flex-row space-x-6 w-auto">
            <div className="flex flex-row items-center space-x-2 w-l">
                <div className="btn btn-soft grow rounded-lg"
                     onClick={ () => previousNoteHandler() }>
                    <FaArrowLeftLong />
                </div>
                <div className="w-8 flex justify-center">
                    <p>{currentId + "/" + totalNum}</p>
                </div>
                <div className="btn btn-soft grow rounded-box"
                     onClick={ () => nextNoteHandler() }>
                    <FaArrowRightLong />
                </div>
            </div>
            <button className="btn btn-soft grow rounded-lg"
                    onClick={ () => submitHandler() }>
                提交
            </button>
        </div>

    );
};

export default NoteSwitcher;