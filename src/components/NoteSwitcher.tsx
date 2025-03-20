import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface NoteSwitcherProps {
    previousNoteHandler: () => void;
    nextNoteHandler: () => void;
    submitHandler: () => void;
    currentId: number;
    totalNum: number;
}

export function NoteSwitcher({
    previousNoteHandler,
    nextNoteHandler,
    submitHandler,
    currentId,
    totalNum,
}: NoteSwitcherProps) {
    return (
        <div className="flex items-center">
            <Button
                variant="outline"
                size="icon"
                onClick={previousNoteHandler}
                disabled={currentId === 1}
            >
                <IoIosArrowBack className="h-4 w-4" />
            </Button>
            <div className="flex items-center">
                <span className="text-sm font-medium w-8 text-center">{currentId}</span>
                <span className="text-sm text-muted-foreground">/</span>
                <span className="text-sm font-medium w-8 text-center">{totalNum}</span>
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={nextNoteHandler}
                disabled={currentId === totalNum}
            >
                <IoIosArrowForward className="h-4 w-4" />
            </Button>
            <Button
                variant="default"
                onClick={submitHandler}
                className="ml-4 bg-primary hover:bg-primary/90 text-white dark:text-white flex items-center gap-2"
            >
                <span>提交</span>
                <Send className="h-4 w-4" />
            </Button>
        </div>
    );
}