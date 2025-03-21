import { NextResponse } from 'next/server';
import { testNotes } from '@/data/data';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/supabase';

// 初始化 Supabase 客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// 将字符串 opinion 映射到枚举值
function mapOpinion(opinion: string): 'agree' | 'disagree' | 'neutral' | null {
    const opinionMap: Record<string, 'agree' | 'disagree' | 'neutral'> = {
        'positive': 'agree',
        'negative': 'disagree',
        'neutral': 'neutral'
    };
    return opinionMap[opinion] || null;
}

// 生成全局唯一的评论ID
function generateGlobalCommentId(noteId: number, localCommentId: number): number {
    // 使用笔记ID和本地评论ID组合生成全局唯一ID
    // 例如：笔记ID=1，评论ID=2，则全局ID=1002
    return noteId * 1000 + localCommentId;
}

export async function POST() {
    try {
        console.log('开始导入测试数据...', { supabaseUrl, testNotesCount: testNotes.length });

        // 清理现有数据
        console.log('清理现有数据...');
        await supabase.from('opinions').delete().neq('id', 0);
        await supabase.from('comments').delete().neq('id', 0);
        await supabase.from('notes').delete().neq('id', 0);
        console.log('数据清理完成');

        // 按顺序导入每个笔记及其评论
        for (const note of testNotes) {
            console.log(`开始处理笔记 ID: ${note.id}`);
            
            // 1. 插入笔记
            const { data: noteData, error: noteError } = await supabase
                .from('notes')
                .insert({
                    id: note.id,
                    title: note.title,
                    content: note.content,
                    tags: note.tags,
                    image_list: note.image_list
                })
                .select();

            if (noteError) {
                console.error('插入笔记失败:', {
                    noteId: note.id,
                    error: noteError,
                    note: JSON.stringify(note)
                });
                throw noteError;
            }

            console.log(`笔记插入成功 ID: ${note.id}`);

            // 2. 插入评论
            for (const comment of note.comments) {
                const globalCommentId = generateGlobalCommentId(note.id, comment.id);
                console.log(`处理评论 ID: ${globalCommentId}`);
                
                // 先插入评论
                const { data: commentData, error: commentError } = await supabase
                    .from('comments')
                    .insert({
                        id: globalCommentId,
                        note_id: note.id,
                        content: comment.content
                    })
                    .select();

                if (commentError) {
                    console.error('插入评论失败:', {
                        noteId: note.id,
                        commentId: globalCommentId,
                        error: commentError,
                        comment: JSON.stringify(comment)
                    });
                    throw commentError;
                }

                console.log(`评论插入成功 ID: ${globalCommentId}`);

                // 插入评论的标注
                if (comment.opinion) {
                    const mappedOpinion = mapOpinion(comment.opinion);
                    console.log(`处理评论标注:`, {
                        commentId: globalCommentId,
                        originalOpinion: comment.opinion,
                        mappedOpinion
                    });

                    const { error: opinionError } = await supabase
                        .from('opinions')
                        .insert({
                            comment_id: globalCommentId,
                            opinion: mappedOpinion
                        })
                        .select();

                    if (opinionError) {
                        console.error('插入评论标注失败:', {
                            commentId: globalCommentId,
                            error: opinionError,
                            opinion: mappedOpinion
                        });
                        throw opinionError;
                    }

                    console.log(`标注插入成功 Comment ID: ${globalCommentId}`);
                }
            }

            console.log(`笔记 ID: ${note.id} 及其所有评论处理完成`);
        }

        console.log('所有数据导入完成');
        return NextResponse.json({
            success: true,
            message: '测试数据导入完成！'
        });

    } catch (error) {
        console.error('导入过程中发生错误:', {
            error,
            message: error instanceof Error ? error.message : '未知错误',
            stack: error instanceof Error ? error.stack : undefined
        });
        
        return NextResponse.json(
            {
                success: false,
                message: '导入过程中发生错误',
                error: error instanceof Error ? error.message : '未知错误'
            },
            { status: 500 }
        );
    }
} 