'use client';

import { useState } from 'react';

export default function ImportPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImport = async () => {
        try {
            setIsLoading(true);
            setMessage('正在导入数据...');

            const response = await fetch('/api/import-test-data', {
                method: 'POST',
            });
            const data = await response.json();

            if (data.success) {
                setMessage('数据导入成功！');
            } else {
                setMessage(`导入失败: ${data.message}`);
            }
        } catch (error) {
            setMessage(`发生错误: ${error instanceof Error ? error.message : '未知错误'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-8">测试数据导入</h1>
            <button
                onClick={handleImport}
                disabled={isLoading}
                className={`px-4 py-2 rounded ${
                    isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                } text-white font-medium`}
            >
                {isLoading ? '导入中...' : '导入测试数据'}
            </button>
            {message && (
                <div className={`mt-4 p-4 rounded ${
                    message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {message}
                </div>
            )}
        </div>
    );
} 