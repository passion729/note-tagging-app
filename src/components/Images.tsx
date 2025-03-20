import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

interface Props {
    images: string[];
}

const Images = ({ images }: Props) => {
    const [imageId, setImageId] = useState(0);

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-row space-x-4">
                { images.map((image, id) => (
                    <div key={ id } className="aspect-3/4 rounded-lg overflow-hidden h-60 ">
                        <img src={ image } alt="" className="h-full object-cover" />
                    </div>
                )) }
            </div>
            <div className="flex flex-row space-x-2 items-center">
                <button className="btn btn-soft rounded-lg"
                onClick={() => {
                    if (imageId > 0) setImageId(imageId - 1)
                }}><IoIosArrowBack /></button>
                <label className="flex justify-center w-6">{ imageId+1 + "/" + images.length }</label>
                <button className="btn btn-soft rounded-lg"
                onClick={() => {
                    if (imageId < images.length - 1) setImageId(imageId + 1)
                }}><IoIosArrowForward /></button>
            </div>
        </div>
    );
};

export default Images;