import React from 'react';

interface LoadingOverlayProps {
    message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = "加载中..." }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-base-100 p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
                <div className="loading loading-spinner loading-lg"></div>
                <div className="text-lg">{message}</div>
            </div>
        </div>
    );
};

export default LoadingOverlay; 