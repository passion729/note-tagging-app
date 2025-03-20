interface Props {
    content: string;
}

const NoteContent = ({ content }: Props) => {
    return (
        <div className="h-full overflow-y-auto">
            <article className="text-wrap leading-7 px-8 pb-4">
                <p>{ content }</p>
            </article>
        </div>
    );
};

export default NoteContent;