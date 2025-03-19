interface Props {
    content: string;
}

const NoteContent = ({ content }: Props) => {
    return (
        <article className="text-wrap leading-7">
            <p>{ content }</p>
        </article>
    );
};

export default NoteContent;