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

                // 1. 插入笔记
                const { error: noteError } = await supabase
                    .from('notes')
                    .insert({
                        id: note.id,
                        title: note.title,
                        content: note.content,
                        image_list: note.image_list || []
                    });

                if (noteError) {
                    throw new Error(`插入笔记失败: ${noteError.message}`);
                }

                // 2. 插入该笔记的所有评论
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

                // 3. 插入笔记和评论的 opinions
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
                for (let i = 0; i < note.comments.length; i++) {
                    const commentId = globalCommentId - note.comments.length + i;
                    opinionsToInsert.push({
                        note_id: note.id,
                        comment_id: commentId,
                        opinion: mapOpinion(note.comments[i].opinion || 'neutral')
                    });
                }

                // 批量插入所有 opinions
                if (opinionsToInsert.length > 0) {
                    console.log('开始批量插入opinions:', JSON.stringify(opinionsToInsert, null, 2));
                    const { error: opinionsError } = await supabase
                        .from('opinions')
                        .insert(opinionsToInsert);

                    if (opinionsError) {
                        throw new Error(`插入opinions失败: ${opinionsError.message}`);
                    }
                }

                console.log(`笔记 ${note.id} 处理完成`);
            } catch (noteError) {
                console.error(`处理笔记 ${note.id} 时出错:`, noteError);
                return NextResponse.json({
                    success: false,
                    message: noteError instanceof Error ? noteError.message : '处理笔记时出错'
                });
            }
        }

        // 验证数据
        const { data: allOpinions, error: fetchError } = await supabase
            .from('opinions')
            .select('*');

        if (fetchError) {
            console.error('获取opinions失败:', fetchError);
            return NextResponse.json({
                success: false,
                message: `获取opinions失败: ${fetchError.message}`
            });
        }

        console.log('所有opinions:', JSON.stringify(allOpinions, null, 2));
        console.log('所有数据导入完成');

        return NextResponse.json({
            success: true,
            message: '测试数据导入成功',
            data: { opinions: allOpinions }
        });

    } catch (error) {
        console.error('导入测试数据时出错:', error);
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : '导入测试数据失败'
        });
    }
}