interface Props {
    title: string;
    tags: string[];
}

export default function Title({ title, tags }: Props) {
    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span key={index} className="text-sm text-gray-500">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}