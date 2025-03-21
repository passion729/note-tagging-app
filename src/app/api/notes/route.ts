import { NextResponse } from 'next/server';
import { testNotes } from '@/data/data';

export async function GET() {
    try {
        // 返回测试数据
        return NextResponse.json({
            success: true,
            data: testNotes
        });
    } catch (error) {
        console.error('获取笔记列表失败:', error);
        return NextResponse.json(
            {
                success: false,
                message: '获取笔记列表失败',
                error: error instanceof Error ? error.message : '未知错误'
            },
            { status: 500 }
        );
    }
} 