import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
    try {
        // 插入测试笔记
        const { data: notes, error: notesError } = await supabase
            .from('notes')
            .insert([
                {
                    title: '测试笔记 1',
                    content: '这是第一个测试笔记的内容。',
                    tags: ['测试', '示例']
                },
                {
                    title: '测试笔记 2',
                    content: '这是第二个测试笔记的内容。',
                    tags: ['测试', '示例']
                }
            ])
            .select();

        if (notesError) {
            throw notesError;
        }

        // 插入测试评论
        const comments = notes.flatMap(note => [
            {
                note_id: note.id,
                content: `这是笔记 ${note.id} 的第一条评论。`
            },
            {
                note_id: note.id,
                content: `这是笔记 ${note.id} 的第二条评论。`
            }
        ]);

        const { error: commentsError } = await supabase
            .from('comments')
            .insert(comments);

        if (commentsError) {
            throw commentsError;
        }

        // 插入测试图片
        const images = notes.flatMap(note => [
            {
                note_id: note.id,
                url: 'https://picsum.photos/400/600'
            },
            {
                note_id: note.id,
                url: 'https://picsum.photos/400/601'
            }
        ]);

        const { error: imagesError } = await supabase
            .from('images')
            .insert(images);

        if (imagesError) {
            throw imagesError;
        }

        return NextResponse.json({
            success: true,
            message: '测试数据插入成功'
        });
    } catch (error) {
        console.error('插入测试数据失败:', error);
        return NextResponse.json(
            {
                success: false,
                message: '插入测试数据失败',
                error: error instanceof Error ? error.message : '未知错误'
            },
            { status: 500 }
        );
    }
} 