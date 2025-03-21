import { TagData } from '@/types';
import { testNotes } from '@/data/data';

interface ValidationError {
    field: string;
    message: string;
}

export function validateTagData(tagData: TagData): ValidationError[] {
    const errors: ValidationError[] = [];

    // 验证 tagData 是否为对象
    if (!tagData || typeof tagData !== 'object') {
        errors.push({
            field: 'tagData',
            message: '标签数据必须是对象格式'
        });
        return errors;
    }

    // 验证是否包含所有笔记的标签
    const taggedNoteIds = Object.keys(tagData);
    if (taggedNoteIds.length !== testNotes.length) {
        errors.push({
            field: 'tagData',
            message: `缺少笔记标签数据，当前只有 ${taggedNoteIds.length} 个笔记的标签，应该有 ${testNotes.length} 个`
        });
    }

    // 验证每个笔记的标签数据
    for (const noteId of taggedNoteIds) {
        const noteData = tagData[noteId];
        // 将字符串ID转换为数字进行比较
        const note = testNotes.find(n => n.id === Number(noteId));

        if (!note) {
            errors.push({
                field: `noteId: ${noteId}`,
                message: '笔记ID不存在'
            });
            continue;
        }

        // 验证笔记标签数据结构
        if (!noteData.noteId || !noteData.noteOpinion || !Array.isArray(noteData.commentOpinions)) {
            errors.push({
                field: `noteId: ${noteId}`,
                message: '笔记标签数据格式不正确'
            });
            continue;
        }

        // 验证笔记标签内容
        if (noteData.noteOpinion.trim() === '') {
            errors.push({
                field: `noteId: ${noteId}`,
                message: '笔记标签不能为空'
            });
        }

        // 验证评论标签数量
        if (noteData.commentOpinions.length !== note.comments.length) {
            errors.push({
                field: `noteId: ${noteId}`,
                message: `评论标签数量不正确，当前有 ${noteData.commentOpinions.length} 个，应该有 ${note.comments.length} 个`
            });
        }

        // 验证评论标签内容
        noteData.commentOpinions.forEach((opinion, index) => {
            if (!opinion || opinion.trim() === '') {
                errors.push({
                    field: `noteId: ${noteId}, commentIndex: ${index}`,
                    message: '评论标签不能为空'
                });
            }
        });
    }

    return errors;
} 