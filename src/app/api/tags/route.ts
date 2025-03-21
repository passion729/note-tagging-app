import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { TagData, NoteTag } from '@/types';
import { validateTagData } from '@/utils/validation';

export async function POST(request: Request) {
    try {
        const { tagData: opinionData, totalNotes } = await request.json();
        
        // 验证标签数据
        const validationErrors = validateTagData(opinionData, totalNotes);
        
        if (validationErrors.length > 0) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: '标签数据验证失败',
                    errors: validationErrors
                },
                { status: 400 }
            );
        }

        // 准备要插入的 opinions 数据
        const opinionsToInsert = [];

        // 遍历每个笔记的标签数据
        for (const [noteId, noteData] of Object.entries(opinionData) as [string, NoteTag][]) {
            // 添加笔记的 opinion
            opinionsToInsert.push({
                note_id: parseInt(noteId),
                comment_id: null, // 使用 null 表示这是笔记的 opinion
                opinion: noteData.noteOpinion
            });

            // 添加评论的 opinions
            const comments = await supabase
                .from('comments')
                .select('id')
                .eq('note_id', noteId);

            if (comments.data) {
                comments.data.forEach((comment, index) => {
                    opinionsToInsert.push({
                        note_id: parseInt(noteId),
                        comment_id: comment.id,
                        opinion: noteData.commentOpinions[index]
                    });
                });
            }
        }

        // 批量插入所有 opinions
        const { error: insertError } = await supabase
            .from('opinions')
            .insert(opinionsToInsert);

        if (insertError) {
            throw insertError;
        }
        
        return NextResponse.json({ 
            success: true, 
            message: '标签数据提交成功' 
        });
    } catch (error) {
        console.error('提交标签数据时出错:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: '提交标签数据失败',
                error: error instanceof Error ? error.message : '未知错误'
            },
            { status: 500 }
        );
    }
} 