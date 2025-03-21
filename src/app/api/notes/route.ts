import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // 获取笔记列表
        const { data: notes, error: notesError } = await supabase
            .from('notes')
            .select(`
                *,
                comments (
                    id,
                    content
                ),
                images (
                    url
                )
            `)
            .order('created_at', { ascending: false });

        if (notesError) {
            throw notesError;
        }

        // 转换数据格式以匹配前端需求
        const formattedNotes = notes.map(note => ({
            id: note.id,
            title: note.title,
            content: note.content,
            tags: note.tags,
            comments: note.comments.map((comment: any) => ({
                content: comment.content,
                opinion: null
            })),
            image_list: note.images.map((img: any) => img.url)
        }));

        return NextResponse.json({
            success: true,
            data: formattedNotes
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