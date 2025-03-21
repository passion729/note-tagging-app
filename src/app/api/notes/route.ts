import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // 获取笔记列表
        const { data: notes, error: notesError } = await supabase
            .from('notes')
            .select(`
                id,
                title,
                content,
                tags,
                image_list,
                created_at,
                comments (
                    id,
                    content
                )
            `)
            .order('created_at', { ascending: false });

        if (notesError) {
            return NextResponse.json(
                {
                    success: false,
                    message: `获取笔记列表失败: ${notesError.message}`,
                    error: notesError.message
                },
                { status: 500 }
            );
        }

        if (!notes) {
            return NextResponse.json(
                {
                    success: false,
                    message: '笔记数据为空',
                    error: '笔记数据为空'
                },
                { status: 500 }
            );
        }

        // 获取所有 opinions
        const { data: opinions, error: opinionsError } = await supabase
            .from('opinions')
            .select('*');

        if (opinionsError) {
            return NextResponse.json(
                {
                    success: false,
                    message: `获取opinions失败: ${opinionsError.message}`,
                    error: opinionsError.message
                },
                { status: 500 }
            );
        }

        // 转换数据格式以匹配前端需求
        const formattedNotes = notes.map(note => {
            // 获取笔记的 opinion
            const noteOpinion = opinions?.find(o => o.note_id === note.id && o.comment_id === null);
            
            // 获取评论的 opinions
            const commentOpinions = opinions?.filter(o => o.note_id === note.id && o.comment_id !== null) || [];

            return {
                id: note.id,
                title: note.title,
                content: note.content,
                tags: note.tags || [],
                comments: (note.comments || []).map((comment: any) => {
                    const commentOpinion = commentOpinions.find(o => o.comment_id === comment.id);
                    return {
                        id: comment.id,
                        content: comment.content,
                        opinion: commentOpinion?.opinion || null
                    };
                }),
                image_list: note.image_list || [],
                opinion: noteOpinion?.opinion || 'neutral'
            };
        });

        return NextResponse.json({
            success: true,
            data: formattedNotes
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : '获取笔记列表失败',
                error: error instanceof Error ? error.message : '未知错误'
            },
            { status: 500 }
        );
    }
} 