import TagButton from "./TagButton.tsx";
import { useForm } from "react-hook-form";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";

interface Comment {
    id: number;
    content: string;
    opinion: string;
}

interface Props {
    comments: Comment[];
    onSubmit?: (opinions: string[]) => void;
    savedOpinions?: string[];
}

interface FormData {
    [key: string]: string;
}

export interface CommentListRef {
    submit: () => void;
    reset: () => void;
}

const CommentList = forwardRef<CommentListRef, Props>(({ comments, onSubmit, savedOpinions }, ref) => {
    const [opinions, setOpinions] = useState<string[]>(new Array(comments.length).fill(""));
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
    };

    const onFormSubmit = () => {
        if (isSubmitting) {
            console.log("正在提交中，请稍候...");
            return;
        }
        
        setIsSubmitting(true);
        if (onSubmit) {
            onSubmit(opinions);
        }
        // 3秒后重置提交状态
        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
    };

    const reset = () => {
        setOpinions(new Array(comments.length).fill(""));
        setIsSubmitting(false);
    };

    useImperativeHandle(ref, () => ({
        submit: onFormSubmit,
        reset
    }));

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="h-full w-full">
            <ul>
                {comments.map((comment, id) => (
                    <li key={comment.id}>
                        <div className="flex flex-row justify-between items-center space-x-4 pr-1">
                            <div className="w-full leading-7 px-1">
                                {comment.content}
                            </div>
                            <TagButton 
                                value={opinions[id]} 
                                onChange={(value) => handleOpinionChange(id, value)} 
                            />
                        </div>
                        {id+1 !== comments.length && <div className="divider my-[1px]" />}
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