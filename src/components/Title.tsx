interface Props {
    title: string;
    tags: string[];
}

const Title = ({ title, tags }: Props) => {
    return (
        <div className="flex flex-col space-y-2">
            <p className="text-3xl font-bold">{ title }</p>
            <div className="flex flex-row flex-wrap gap-2">
                { tags.map((tag) => (
                    <p key={tag} className="text-gray-500">
                        { "#" + tag }
                    </p>
                )) }
            </div>
        </div>
    );
};

export default Title;