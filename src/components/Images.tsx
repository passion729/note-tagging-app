import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Props {
    images: { id: number, url: string }[];
}

const Images = ({ images }: Props) => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-row space-x-4">
                { images.map((image) => (
                    <div key={ image.id } className="aspect-3/4 rounded-lg overflow-hidden ">
                        <img src={ image.url } alt="" className="h-full object-cover" />
                    </div>
                )) }
            </div>
            <div className="flex flex-row space-x-2 items-center">
                <button className="btn btn-soft rounded-lg"><IoIosArrowBack /></button>
                <label>1 / 3</label>
                <button className="btn btn-soft rounded-lg"><IoIosArrowForward /></button>
            </div>
        </div>
    );
};

export default Images;