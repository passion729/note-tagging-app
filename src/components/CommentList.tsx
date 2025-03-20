import TagButton from "./TagButton.tsx";

interface Props {
    comments: string[];
}

const CommentList = ({ comments }: Props) => {
    return (
        <div className="h-full w-full">
            <ul>
                { comments.map((comment, id) => (
                    <li key={ id }>
                        <div className="flex flex-row justify-between items-center space-x-4 pr-1">
                            <div className="w-full leading-7 px-1">
                                { comment }
                            </div>
                            <TagButton radio_name={ "comment_tag" + id } />
                        </div>
                        { id+1 !== comments.length && <div className="divider my-[1px]" /> }
                    </li>
                )) }
            </ul>
        </div>

    );
};

export default CommentList;