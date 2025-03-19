interface Props {
    images: {id: number, url: string}[];
}

const Images = ({images}: Props) => {
    return (
        <div className="place-items-center">
            <div className="flex flex-row space-x-4">
                { images.map((image) => (
                    <div key={image.id} className="aspect-3/4 rounded-lg overflow-hidden">
                        <img src={image.url} className="h-full inset-0 object-cover" />
                    </div>
                ))}
            </div>
            <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">1 of 3</button>
                <button className="join-item btn">»</button>
            </div>
        </div>
    );
};

export default Images;