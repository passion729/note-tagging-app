import { createClient } from '@supabase/supabase-js';
import { testNotes } from './data';
import { Database } from '@/lib/supabase';

// 初始化 Supabase 客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function importTestData() {
    try {
        console.log('开始导入测试数据...');

        // 按顺序导入每个笔记及其评论
        for (const note of testNotes) {
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
                .select()
                .single();

            if (noteError) {
                console.error(`插入笔记失败 (ID: ${note.id}):`, noteError);
                continue;
            }

            // 2. 插入评论
            for (const comment of note.comments) {
                // 先插入评论
                const { data: commentData, error: commentError } = await supabase
                    .from('comments')
                    .insert({
                        id: comment.id,
                        note_id: note.id,
                        content: comment.content
                    })
                    .select()
                    .single();

                if (commentError) {
                    console.error(`插入评论失败 (Note ID: ${note.id}, Comment ID: ${comment.id}):`, commentError);
                    continue;
                }

                // 插入评论的标注
                if (comment.opinion) {
                    const { error: opinionError } = await supabase
                        .from('opinions')
                        .insert({
                            comment_id: comment.id,
                            opinion: mapOpinion(comment.opinion)
                        });

                    if (opinionError) {
                        console.error(`插入评论标注失败 (Comment ID: ${comment.id}):`, opinionError);
                    }
                }
            }

            console.log(`成功导入笔记 ID: ${note.id} 及其评论`);
        }

        console.log('测试数据导入完成！');

    } catch (error) {
        console.error('导入过程中发生错误:', error);
    }
}

// 将字符串 opinion 映射到枚举值
function mapOpinion(opinion: string): 'agree' | 'disagree' | 'neutral' | null {
    const opinionMap: Record<string, 'agree' | 'disagree' | 'neutral'> = {
        'positive': 'agree',
        'negative': 'disagree',
        'neutral': 'neutral'
    };
    return opinionMap[opinion] || null;
}

// 执行导入
importTestData().catch(console.error);