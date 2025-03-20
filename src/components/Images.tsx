import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { CachedImage } from "./CachedImage";
import { Button } from "./ui/button";
import ImagePreview from "./ImagePreview";

interface ImagesProps {
    images: string[];
}

const IMAGES_PER_PAGE = 3;

export default function Images({ images }: ImagesProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

    const startIndex = currentPage * IMAGES_PER_PAGE;
    const endIndex = Math.min(startIndex + IMAGES_PER_PAGE, images.length);
    const currentImages = images.slice(startIndex, endIndex);

    return (
        <div className="h-full flex flex-col gap-2">
            <div className="flex-grow grid grid-cols-3 gap-4">
                {currentImages.map((image, id) => (
                    <div
                        key={id}
                        className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
                        onClick={() => setPreviewImage(image)}
                    >
                        <CachedImage
                            src={image}
                            alt={`图片 ${startIndex + id + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
            <div className="h-14 flex items-center justify-center mt-2 bg-base-100 z-10">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        if (currentPage > 0) setCurrentPage(currentPage - 1);
                    }}
                    disabled={currentPage === 0 || totalPages <= 1}
                >
                    <IoIosArrowBack className="h-4 w-4" />
                </Button>
                <div className="flex items-center">
                    <span className="text-sm font-medium w-8 text-center">{currentPage + 1}</span>
                    <span className="text-sm text-muted-foreground">/</span>
                    <span className="text-sm font-medium w-8 text-center">{totalPages}</span>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
                    }}
                    disabled={currentPage === totalPages - 1 || totalPages <= 1}
                >
                    <IoIosArrowForward className="h-4 w-4" />
                </Button>
            </div>
            {previewImage && (
                <ImagePreview
                    imageUrl={previewImage}
                    onClose={() => setPreviewImage(null)}
                />
            )}
        </div>
    );
}