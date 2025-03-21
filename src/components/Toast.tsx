import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
    duration?: number;
}

export function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div
                className={cn(
                    "px-4 py-2 rounded-lg shadow-lg text-white",
                    type === 'success' ? 'bg-success' : 'bg-error'
                )}
            >
                {message}
            </div>
        </div>
    );
} 