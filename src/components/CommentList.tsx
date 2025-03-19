import TagButton from "./TagButton.tsx";

interface Props {
    comments: { id: number, content: string }[];
}

const CommentList = ({ comments }: Props) => {
    return (
        <div className="h overflow-auto">
            <ul className="overscroll-contain">
                { comments.map((comment) => (
                    <li key={ comment.id }>
                        <div className="flex flex-row justify-between items-center space-x-4">
                            <div className="w-full leading-7 px-1">
                                { comment.content }
                            </div>

                            <TagButton radio_name={"comment_tag"+comment.id} />
                        </div>
                        <div className="divider my-[1px]" />
                    </li>
                )) }
            </ul>
        </div>

    );
};

export default CommentList;