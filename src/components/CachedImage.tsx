import { useState, useEffect } from 'react';

interface CachedImageProps {
    src: string;
    alt?: string;
    className?: string;
}

export function CachedImage({ src, alt = '', className = '' }: CachedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        // 检查图片是否已经在缓存中
        const cachedImage = imageCache.get(src);
        if (cachedImage) {
            setImageSrc(cachedImage);
            setIsLoaded(true);
            return;
        }

        // 如果不在缓存中，加载图片
        const img = new Image();
        img.src = src;
        img.onload = () => {
            // 将图片添加到缓存中
            imageCache.set(src, src);
            setImageSrc(src);
            setIsLoaded(true);
        };
    }, [src]);

    if (!isLoaded) {
        return (
            <div className={`animate-pulse bg-gray-200 ${className}`}>
                <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">加载中...</span>
                </div>
            </div>
        );
    }

    return (
        <img
            src={imageSrc || ''}
            alt={alt}
            className={className}
        />
    );
}

// 创建图片缓存
const imageCache = new Map<string, string>(); 