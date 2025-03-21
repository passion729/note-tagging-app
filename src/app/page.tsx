"use client"

import NoteContent from "@/components/NoteContent";
import Images from "@/components/Images";
import TagButton from "@/components/TagButton";
import CommentList, { CommentListRef } from "@/components/CommentList";
import Title from "@/components/Title";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { NoteSwitcher } from "@/components/NoteSwitcher";
import { useState, useRef, useEffect } from "react";
import { TagData, Note } from "@/types";
import { saveTagData, isAllNotesTagged, clearTagData } from "@/utils/storage";
import ImagePreview from "@/components/ImagePreview";
import { Toast } from '@/components/Toast';
import LoadingOverlay from "@/components/LoadingOverlay";

// 图片预加载函数
const preloadImage = (url: string) => {
    const img = new Image();
    img.src = url;
};

// 在文件顶部添加防抖函数
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function(...args: never[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

function App() {
    const [noteId, setNoteId] = useState(0);
    const [noteOpinion, setNoteOpinion] = useState("");
    const [tagData, setTagData] = useState<TagData>({});
    const commentListRef = useRef<CommentListRef>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [allTagged, setAllTagged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showWarning] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // 获取笔记列表
    const fetchNotes = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await fetch('/api/notes');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('服务器返回的不是 JSON 数据');
            }
            
            const result = await response.json();

            if (result.success) {
                setNotes(result.data);
            } else {
                throw new Error(result.message || '获取笔记列表失败');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : '获取笔记列表失败，请刷新页面重试');
        } finally {
            setIsLoading(false);
        }
    };

    // 组件加载时获取笔记列表
    useEffect(() => {
        fetchNotes();
    }, []);

    // 加载已保存的标签数据
    useEffect(() => {
        // 清除所有数据
        clearTagData();

        // 重置所有状态
        setNoteOpinion("");
        commentListRef.current?.reset();
        setTagData({});
    }, []);

    // 监听标签变化，更新allTagged状态，使用防抖函数避免频繁更新
    useEffect(() => {
        // 使用防抖函数，延迟检查标签状态
        const debouncedCheck = debounce(() => {
            const allTagsComplete = isAllTagged();
            setAllTagged(allTagsComplete);
        }, 800); // 使用较长的延迟，确保标签变化后有足够时间稳定

        // 初始检查
        debouncedCheck();

        // 设置事件监听器，降低检查频率
        const interval = setInterval(debouncedCheck, 1000);

        return () => clearInterval(interval);
    }, [noteId, noteOpinion, tagData]); // 添加所有相关依赖

    // 预加载当前笔记的图片
    useEffect(() => {
        if (notes && notes[noteId]) {
            // 预加载当前笔记的图片
            notes[noteId].image_list.forEach(preloadImage);

            // 预加载下一笔记的图片
            if (noteId < notes.length - 1) {
                notes[noteId + 1].image_list.forEach(preloadImage);
            }

            // 预加载上一笔记的图片
            if (noteId > 0) {
                notes[noteId - 1].image_list.forEach(preloadImage);
            }
        }
    }, [noteId, notes]);

    // 后台预加载所有笔记的图片
    useEffect(() => {
        if (notes) {
            // 创建一个 Set 来存储已加载的图片 URL，避免重复加载
            const loadedImages = new Set<string>();

            // 预加载所有笔记的图片
            notes.forEach(note => {
                note.image_list.forEach(url => {
                    if (!loadedImages.has(url)) {
                        preloadImage(url);
                        loadedImages.add(url);
                    }
                });
            });
        }
    }, [notes]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
            return '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleCommentSubmit = (opinions: string[]) => {
        const currentNoteId = notes[noteId].id;

        // 获取当前笔记的现有标签数据
        const currentNoteData = tagData[currentNoteId] || {
            noteId: currentNoteId,
            noteOpinion: "",
            commentOpinions: []
        };

        // 更新标签数据，保留现有的笔记标签
        const newTagData: TagData = {
            ...tagData,
            [currentNoteId]: {
                ...currentNoteData,
                commentOpinions: opinions
            }
        };

        // 立即保存到localStorage
        saveTagData(newTagData);

        // 更新状态
        setTagData(newTagData);

        // 如果所有笔记都已标记，可以提交到服务器
        if (isAllNotesTagged(newTagData, notes.length)) {
            // TODO: 调用API提交数据
        }
    };

    // 获取当前笔记的已保存评论标签
    const getCurrentNoteSavedOpinions = () => {
        if (!notes || !notes[noteId]) return [];
        const currentNoteId = notes[noteId].id;
        return tagData[currentNoteId]?.commentOpinions || [];
    };

// 用于UI交互的检查函数，会设置错误消息
    const isCurrentNoteTagged = () => {
        if (!notes || !notes[noteId]) {
            setError("数据加载中，请稍候");
            return false;
        }

        // 检查笔记标签是否已添加
        if (!noteOpinion) {
            setError("请先标记当前笔记");
            return false;
        }

        // 获取当前笔记的评论标签
        const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];
        const currentComments = notes[noteId].comments;

        // 检查评论标签数量是否与评论数量一致
        if (currentOpinions.length !== currentComments.length) {
            setError("请先标记当前笔记的所有评论");
            return false;
        }

        // 检查评论标签是否都不为空
        if (currentOpinions.some((opinion: string) => !opinion)) {
            setError("请先标记当前笔记的所有评论");
            return false;
        }

        // 检查评论标签是否按顺序排列
        const sortedOpinions = [...currentOpinions].sort();
        const sortedComments = currentComments.map(comment => comment.content).sort();
        if (sortedOpinions.length !== sortedComments.length) {
            setError("请先标记当前笔记的所有评论");
            return false;
        }

        // 检查每个评论是否都有对应的标签
        const hasAllCommentsTagged = currentComments.every((comment, index) => {
            return currentOpinions[index] && currentOpinions[index].trim() !== '';
        });

        if (!hasAllCommentsTagged) {
            setError("请先标记当前笔记的所有评论");
            return false;
        }

        // 如果所有检查都通过，清除错误信息
        setError(null);
        return true;
    };

    // 检查所有笔记和评论是否都已标记（不修改状态）
    const isAllTagged = () => {
        if (!notes || !notes[noteId]) return false;

        // 获取当前笔记的评论标签
        const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];
        const currentComments = notes[noteId].comments;

        // 检查当前笔记
        // 1. 检查笔记标签是否已添加
        if (!noteOpinion) {
            return false;
        }

        // 2. 检查评论标签数量是否与评论数量一致
        if (currentOpinions.length < currentComments.length) {
            return false;
        }

        // 3. 检查评论标签是否都不为空
        if (currentOpinions.some((opinion: string) => !opinion)) {
            return false;
        }

        // 构建包含当前笔记标签的完整标签数据
        const completeTagData: TagData = {
            ...tagData,
            [notes[noteId].id]: {
                noteId: notes[noteId].id,
                noteOpinion,
                commentOpinions: currentOpinions
            }
        };

        // 检查是否已为所有笔记添加标签
        const taggedNoteIds = Object.keys(completeTagData);
        if (taggedNoteIds.length < notes.length) {
            return false;
        }

        // 检查每个笔记是否都有有效标签
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            const noteTagData = completeTagData[note.id];

            // 检查笔记是否有标签
            if (!noteTagData || !noteTagData.noteOpinion) {
                return false;
            }

            // 检查笔记的评论是否都有标签
            if (!noteTagData.commentOpinions || noteTagData.commentOpinions.length < note.comments.length) {
                return false;
            }

            // 检查评论标签是否都不为空
            if (noteTagData.commentOpinions.some((opinion: string) => !opinion)) {
                return false;
            }
        }

        return true;
    };

    const handleNextNote = () => {
        if (noteId < notes.length - 1) {
            // 获取当前笔记的评论标签
            const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];

            // 保存当前笔记的标签数据
            const currentNoteId = notes[noteId].id;
            const currentNoteData = tagData[currentNoteId] || {
                noteId: currentNoteId,
                noteOpinion: "",
                commentOpinions: []
            };

            // 更新标签数据，保留现有的评论标签
            const updatedTagData: TagData = {
                ...tagData,
                [currentNoteId]: {
                    ...currentNoteData,
                    noteOpinion: noteOpinion || "",
                    commentOpinions: currentOpinions
                }
            };

            // 计算下一笔记的ID
            const nextNoteIndex = noteId + 1;
            const nextNoteId = notes[nextNoteIndex].id;

            // 先保存数据
            setTagData(updatedTagData);
            saveTagData(updatedTagData);

            // 检查当前笔记和评论是否都已标记
            if (!isCurrentNoteTagged()) {
                return;
            }

            // 切换到下一笔记
            setNoteId(nextNoteIndex);

            // 重置笔记标签
            setNoteOpinion("");

            // 如果下一笔记已有标签，加载它们
            if (updatedTagData[nextNoteId]) {
                setNoteOpinion(updatedTagData[nextNoteId].noteOpinion);
            }

            // 重置评论列表，确保在加载新笔记后加载对应的评论标签
            setTimeout(() => {
                commentListRef.current?.reset();
                // 如果下一笔记有保存的评论标签，加载它们
                if (updatedTagData[nextNoteId]?.commentOpinions) {
                    commentListRef.current?.setOpinions(updatedTagData[nextNoteId].commentOpinions);
                }
            }, 10);
        }
    };

    const handlePreviousNote = () => {
        if (noteId > 0) {
            // 获取当前笔记的评论标签
            const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];

            // 保存当前笔记的标签数据
            const currentNoteId = notes[noteId].id;
            const currentNoteData = tagData[currentNoteId] || {
                noteId: currentNoteId,
                noteOpinion: "",
                commentOpinions: []
            };

            // 更新标签数据，保留现有的评论标签
            const updatedTagData: TagData = {
                ...tagData,
                [currentNoteId]: {
                    ...currentNoteData,
                    noteOpinion: noteOpinion || "",
                    commentOpinions: currentOpinions
                }
            };

            // 计算上一笔记的ID
            const prevNoteIndex = noteId - 1;
            const prevNoteId = notes[prevNoteIndex].id;

            // 先保存数据
            setTagData(updatedTagData);
            saveTagData(updatedTagData);

            // 检查当前笔记和评论是否都已标记
            if (!isCurrentNoteTagged()) {
                return;
            }

            // 切换到上一笔记
            setNoteId(prevNoteIndex);

            // 重置笔记标签
            setNoteOpinion("");

            // 如果上一笔记已有标签，加载它们
            if (updatedTagData[prevNoteId]) {
                setNoteOpinion(updatedTagData[prevNoteId].noteOpinion);
            }

            // 重置评论列表，确保在加载新笔记后加载对应的评论标签
            setTimeout(() => {
                commentListRef.current?.reset();
                // 如果上一笔记有保存的评论标签，加载它们
                if (updatedTagData[prevNoteId]?.commentOpinions) {
                    commentListRef.current?.setOpinions(updatedTagData[prevNoteId].commentOpinions);
                }
            }, 10);
        }
    };

    const handleSubmit = async () => {
        if (!isSubmitting && allTagged) {
            try {
                setIsSubmitting(true);
                
                // 获取当前笔记的评论标签
                const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];

                // 构建完整的标签数据，包含当前笔记的标签
                const completeTagData: TagData = {
                    ...tagData,
                    [notes[noteId].id]: {
                        noteId: notes[noteId].id,
                        noteOpinion: noteOpinion || "",
                        commentOpinions: currentOpinions
                    }
                };

                // 调用API提交数据
                const response = await fetch('/api/tags', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tagData: completeTagData,
                        totalNotes: notes.length
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    // 提交成功，清除本地存储的数据
                    clearTagData();
                    // 重置状态
                    setTagData({});
                    setNoteOpinion("");
                    commentListRef.current?.reset();
                    // 重置到第一篇笔记
                    setNoteId(0);
                    // 显示成功消息
                    setToast({
                        message: '标签数据提交成功！',
                        type: 'success'
                    });
                } else {
                    // 处理验证错误
                    if (result.errors && Array.isArray(result.errors)) {
                        const errorMessages = result.errors.map((error: { field: string; message: string }) => 
                            `${error.field}: ${error.message}`
                        ).join('\n');
                        setToast({
                            message: `验证失败：${errorMessages}`,
                            type: 'error'
                        });
                    } else {
                        setToast({
                            message: result.message || '提交失败，请重试',
                            type: 'error'
                        });
                    }
                }
            } catch (error) {
                console.error('提交标签数据时出错:', error);
                setToast({
                    message: '提交标签数据失败，请重试',
                    type: 'error'
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-screen flex items-center justify-center p-8">
                <div className="w-full max-w-[1400px] min-w-[1200px] h-[900px] max-h-[90vh] min-h-[900px] flex items-center justify-center bg-base-100 rounded-lg shadow-lg">
                    <div className="text-lg">正在获取笔记...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center p-8">
            <div className="w-full max-w-[1400px] min-w-[1200px] h-[900px] max-h-[90vh] min-h-[900px] flex flex-col bg-base-100 rounded-lg shadow-lg relative">
                <div className="flex justify-between items-center mb-2 px-8 pt-8">
                    <Title title={notes[noteId].title} tags={notes[noteId].tags} />
                    <div className="ml-32">
                        <ThemeSwitcher />
                    </div>
                </div>

                <div className="divider my-0" />

                <div className="flex-1 flex flex-row mt-4 min-h-0 px-8 pb-8">
                    <div className="flex flex-col w-1/2 pr-4">
                        <div className="flex flex-col h-full">
                            <div>
                                <Images images={notes[noteId].image_list} />
                            </div>
                            <div className="flex-grow overflow-y-auto mt-2">
                                <NoteContent content={notes[noteId].content} />
                            </div>
                            <div className="h-16 mt-4 flex items-center justify-center shrink-0">
                                <div className="w-3/5 h-11">
                                    <TagButton
                                        value={noteOpinion}
                                        onChange={setNoteOpinion}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="divider divider-horizontal mx-4" />

                    <div className="flex flex-col w-1/2 pl-4 min-h-0">
                        <div className="flex flex-col h-full">
                            <div className="flex-grow overflow-y-auto">
                                <CommentList
                                    ref={commentListRef}
                                    comments={notes[noteId].comments}
                                    onSubmit={handleCommentSubmit}
                                    savedOpinions={getCurrentNoteSavedOpinions()}
                                    showWarning={showWarning}
                                />
                            </div>
                            <div className="h-8 flex flex-row justify-between items-center mt-2">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {!noteOpinion ? "笔记未标记" : "笔记已标记"} | 
                                    评论已标记 {getCurrentNoteSavedOpinions().filter(opinion => opinion).length}/{notes[noteId].comments.length}
                                </div>
                                <div className="h-full flex items-center">
                                    {error && (
                                        <div className="text-sm text-error bg-error/10 px-2 py-1 rounded">
                                            {error}
                                        </div>
                                    )}
                                    {showWarning && !error && (
                                        <div className="text-sm text-error bg-warning/10 px-2 py-1 rounded">
                                            {!noteOpinion ? "请先标记当前笔记" : "请先标记当前笔记的所有评论"}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="h-16 mt-4 flex items-center justify-end shrink-0 place-self-end">
                                <NoteSwitcher
                                    previousNoteHandler={handlePreviousNote}
                                    nextNoteHandler={handleNextNote}
                                    submitHandler={handleSubmit}
                                    currentId={noteId + 1}
                                    totalNum={notes.length}
                                    submitDisabled={!allTagged || isSubmitting}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {previewImage && (
                    <ImagePreview
                        imageUrl={previewImage}
                        onClose={() => setPreviewImage(null)}
                    />
                )}
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
                {isSubmitting && (
                    <LoadingOverlay message="正在提交数据，请稍候..." />
                )}
            </div>
        </div>
    );
}
export default App;

