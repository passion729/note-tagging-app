interface Props {
    content: string;
}

const NoteContent = ({ content }: Props) => {
    return (
        <article className="text-wrap">
            <p>{ content }</p>
        </article>
    );
};

export default NoteContent;