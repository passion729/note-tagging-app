import { IoMdClose } from "react-icons/io";

interface ImagePreviewProps {
    imageUrl: string;
    onClose: () => void;
}

export default function ImagePreview({ imageUrl, onClose }: ImagePreviewProps) {
    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="relative max-w-[90vw] max-h-[90vh]">
                <img 
                    src={imageUrl} 
                    alt="预览图片" 
                    className="max-w-full max-h-[90vh] object-contain"
                />
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute -top-12 -right-12 text-white hover:text-gray-300 transition-colors"
                >
                    <IoMdClose size={32} />
                </button>
            </div>
        </div>
    );
} 