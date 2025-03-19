import TagButton from "./TagButton.tsx";

interface Props {
    comments: { id: number, content: string }[];
}

const CommentList = ({ comments }: Props) => {
    return (
        <ul className="list bg-base-100 rounded-box">
            { comments.map((comment) => (
                <li key={ comment.id } className="p-2">
                    <div className="flex flex-row justify-between items-center space-x-4">
                        <div className="w-full">
                            { comment.content }
                        </div>

                        <TagButton />
                    </div>
                    <div className="divider my-[1px]" />



                </li>
            )) }
        </ul>
    );
};

export default CommentList;