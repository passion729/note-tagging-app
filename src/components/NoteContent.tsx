interface Props {
    content: string;
}

const NoteContent = ({ content }: Props) => {
    return (
        <article className="text-wrap leading-7 px-8">
            <p>{ content }</p>
        </article>
    );
};

export default NoteContent;