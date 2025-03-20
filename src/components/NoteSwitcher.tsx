import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

interface NoteSwitcherProps {
    previousNoteHandler: () => void;
    nextNoteHandler: () => void;
    submitHandler: () => void;
    currentId: number;
    totalNum: number;
    currentCommentsCount: number;
}

export function NoteSwitcher({
    previousNoteHandler,
    nextNoteHandler,
    submitHandler,
    currentId,
    totalNum,
    currentCommentsCount
}: NoteSwitcherProps) {
    return (
        <div className="flex items-center gap-4">
            <Button
                variant="outline"
                size="icon"
                onClick={previousNoteHandler}
                disabled={currentId === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">评论数：{currentCommentsCount}</span>
                <span className="text-sm text-muted-foreground">/</span>
                <span className="text-sm font-medium">笔记 {currentId}</span>
                <span className="text-sm text-muted-foreground">/</span>
                <span className="text-sm font-medium">{totalNum}</span>
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={nextNoteHandler}
                disabled={currentId === totalNum}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
                variant="default"
                size="icon"
                onClick={submitHandler}
            >
                <Send className="h-4 w-4" />
            </Button>
        </div>
    );
}