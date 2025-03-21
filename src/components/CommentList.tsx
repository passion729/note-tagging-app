import TagButton from "./TagButton";
import { useForm } from "react-hook-form";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { Comment } from "@/types";

interface Props {
    comments: Comment[];
    onSubmit?: (opinions: string[]) => void;
    savedOpinions?: string[];
    showWarning?: boolean;
    noteOpinion?: string;
}

interface FormData {
    [key: string]: string;
}

export interface CommentListRef {
    reset: () => void;
    getCurrentOpinions: () => string[];
    submit: () => void;
    setOpinions: (opinions: string[]) => void;
}

const CommentList = forwardRef<CommentListRef, Props>(({ comments, onSubmit, savedOpinions = [], showWarning = false, noteOpinion = "" }, ref) => {
    const [opinions, setOpinions] = useState<string[]>(savedOpinions);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleSubmit } = useForm<FormData>();

    // 当savedOpinions改变时，加载保存的标签
    useEffect(() => {
        if (savedOpinions && savedOpinions.length > 0) {
            setOpinions(savedOpinions);
        }
    }, [savedOpinions]);

    const handleOpinionChange = (index: number, value: string) => {
        const newOpinions = [...opinions];
        newOpinions[index] = value;
        setOpinions(newOpinions);
        onSubmit?.(newOpinions);
    };

    const onFormSubmit = () => {
        if (isSubmitting) {
            console.log("正在提交中，请稍候...");
            return;
        }
        
        console.log("CommentList - 提交所有评论标签:", opinions);
        setIsSubmitting(true);
        if (onSubmit) {
            onSubmit(opinions);
        }
        // 3秒后重置提交状态
        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
    };

    useImperativeHandle(ref, () => ({
        reset: () => {
            setOpinions([]);
        },
        getCurrentOpinions: () => {
            return opinions;
        },
        submit: () => {
            onSubmit?.(opinions);
        },
        setOpinions: (newOpinions: string[]) => {
            setOpinions(newOpinions);
        }
    }));

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="h-full w-full flex flex-col justify-between items-center">
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <div className="flex flex-row justify-between items-center space-x-4 pr-1">
                            <div className="w-full leading-7 px-1">
                                {comment.content}
                            </div>
                            <div className="flex gap-2">
                                <TagButton
                                    value={opinions[index]}
                                    onChange={(value) => handleOpinionChange(index, value)}
                                />
                            </div>
                        </div>
                        {index + 1 !== comments.length && <div className="divider my-[1px]" />}
                    </li>
                ))}
            </ul>
            {isSubmitting && (
                <div className="text-center text-sm text-gray-500 mt-2">
                    提交中...
                </div>
            )}
        </form>
    );
});

export default CommentList;