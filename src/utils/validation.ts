import { TagData } from '@/types';

export const validateTagData = (tagData: TagData, totalNotes: number) => {
    const errors: { field: string; message: string }[] = [];

    // 检查 tagData 是否为对象
    if (!tagData || typeof tagData !== 'object') {
        errors.push({
            field: 'tagData',
            message: '标签数据必须是对象'
        });
        return errors;
    }

    // 获取所有已标记的笔记ID
    const taggedNoteIds = Object.keys(tagData);

    // 检查是否有笔记被标记
    if (taggedNoteIds.length === 0) {
        errors.push({
            field: 'tagData',
            message: '没有笔记被标记'
        });
        return errors;
    }

    // 检查是否所有笔记都已标记
    if (taggedNoteIds.length !== totalNotes) {
        errors.push({
            field: 'tagData',
            message: `缺少笔记标签数据，当前只有 ${taggedNoteIds.length} 个笔记的标签，应该有 ${totalNotes} 个`
        });
    }

    // 检查每个笔记的标签数据
    taggedNoteIds.forEach(noteId => {
        const noteData = tagData[noteId];

        // 检查笔记数据是否完整
        if (!noteData.noteId || !noteData.noteOpinion || !Array.isArray(noteData.commentOpinions)) {
            errors.push({
                field: `tagData.${noteId}`,
                message: '笔记标签数据不完整'
            });
        }

        // 检查笔记标签是否为空
        if (!noteData.noteOpinion.trim()) {
            errors.push({
                field: `tagData.${noteId}.noteOpinion`,
                message: '笔记标签不能为空'
            });
        }

        // 检查评论标签是否为空
        const emptyCommentOpinions = noteData.commentOpinions.filter(opinion => !opinion.trim());
        if (emptyCommentOpinions.length > 0) {
            errors.push({
                field: `tagData.${noteId}.commentOpinions`,
                message: '评论标签不能为空'
            });
        }
    });

    return errors;
}; 