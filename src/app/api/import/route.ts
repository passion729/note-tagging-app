import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { testNotes } from '@/data/data';

// 创建 Supabase 客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

type OpinionType = 'agree' | 'disagree' | 'neutral';

interface Comment {
    id: number;
    content: string;
    opinion: string;
}

interface Note {
    id: number;
    title: string;
    content: string;
    image_list: string[];
    tags: string[];
    comments: Comment[];
    opinion: string;
}

// 将字符串 opinion 映射到枚举值
function mapOpinion(opinion: string): OpinionType {
    const opinionMap: Record<string, OpinionType> = {
        'positive': 'agree',
        'negative': 'disagree',
        'neutral': 'neutral'
    };
    return opinionMap[opinion] || 'neutral';
}

export async function GET() {
    try {
        let globalCommentId = 1; // 用于生成唯一的评论ID

        // 按照依赖关系的正向顺序插入数据
        for (const note of testNotes as Note[]) {
            try {
                console.log(`处理笔记 ${note.id}...`);

                // 1. 插入笔记（使用 upsert）
                const { error: noteError } = await supabase
                    .from('notes')
                    .upsert({
                        id: note.id,
                        title: note.title,
                        content: note.content,
                        image_list: note.image_list || [],
                        tags: note.tags || []
                    }, {
                        onConflict: 'id'
                    });

                if (noteError) {
                    throw new Error(`插入笔记失败: ${noteError.message}`);
                }

                // 2. 删除该笔记的所有现有评论和意见
                const { error: deleteError } = await supabase
                    .from('opinions')
                    .delete()
                    .eq('note_id', note.id);

                if (deleteError) {
                    console.error(`删除笔记 ${note.id} 的意见失败:`, deleteError);
                }

                const { error: deleteCommentsError } = await supabase
                    .from('comments')
                    .delete()
                    .eq('note_id', note.id);

                if (deleteCommentsError) {
                    console.error(`删除笔记 ${note.id} 的评论失败:`, deleteCommentsError);
                }

                // 3. 插入该笔记的所有评论
                const commentsToInsert = note.comments.map(comment => ({
                    id: globalCommentId++,
                    note_id: note.id,
                    content: comment.content
                }));

                if (commentsToInsert.length > 0) {
                    const { error: commentsError } = await supabase
                        .from('comments')
                        .insert(commentsToInsert);

                    if (commentsError) {
                        throw new Error(`插入评论失败: ${commentsError.message}`);
                    }
                }

                // 4. 插入笔记和评论的 opinions
                const opinionsToInsert = [];

                // 添加笔记的 opinion（comment_id 为 null）
                if (note.opinion) {
                    opinionsToInsert.push({
                        note_id: note.id,
                        comment_id: null, // 使用 null 表示这是笔记的 opinion
                        opinion: mapOpinion(note.opinion)
                    });
                }

                // 添加评论的 opinions
                note.comments.forEach((comment, index) => {
                    if (comment.opinion) {
                        opinionsToInsert.push({
                            note_id: note.id,
                            comment_id: globalCommentId - note.comments.length + index,
                            opinion: mapOpinion(comment.opinion)
                        });
                    }
                });

                if (opinionsToInsert.length > 0) {
                    const { error: opinionsError } = await supabase
                        .from('opinions')
                        .insert(opinionsToInsert);

                    if (opinionsError) {
                        throw new Error(`插入意见失败: ${opinionsError.message}`);
                    }
                }

                console.log(`成功导入笔记 ID: ${note.id} 及其评论`);
            } catch (error) {
                console.error(`处理笔记 ${note.id} 时出错:`, error);
                throw error;
            }
        }

        return NextResponse.json({
            success: true,
            message: '测试数据导入成功'
        });

    } catch (error) {
        console.error('导入测试数据时出错:', error);
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : '导入测试数据失败'
        });
    }
}