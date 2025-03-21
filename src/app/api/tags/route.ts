import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { TagData } from '@/types';
import { validateTagData } from '@/utils/validation';

export async function POST(request: Request) {
    try {
        const tagData: TagData = await request.json();
        
        // 验证标签数据
        const validationErrors = validateTagData(tagData);
        
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

        const noteId = parseInt(Object.keys(tagData)[0]);
        const noteData = tagData[noteId];

        // 插入标签数据
        const { error: tagDataError } = await supabase
            .from('tag_data')
            .insert({
                note_id: noteId,
                note_opinion: noteData.noteOpinion,
                comment_opinions: noteData.commentOpinions
            });

        if (tagDataError) {
            throw tagDataError;
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