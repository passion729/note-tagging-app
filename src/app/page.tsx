"use client"

import { testNotes } from "@/data/data";
import NoteContent from "@/components/NoteContent";
import Images from "@/components/Images";
import TagButton from "@/components/TagButton";
import CommentList, { CommentListRef } from "@/components/CommentList";
import Title from "@/components/Title";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { NoteSwitcher } from "@/components/NoteSwitcher";
import { useState, useRef, useEffect } from "react";
import { TagData } from "@/types";
import { saveTagData, isAllNotesTagged, clearTagData } from "@/utils/storage";
import ImagePreview from "@/components/ImagePreview";

// 图片预加载函数
const preloadImages = (imageUrls: string[]) => {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
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
    const [showWarning, setShowWarning] = useState(false);

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

    // 预加载下一笔记的图片
    useEffect(() => {
        if (noteId < testNotes.length - 1) {
            preloadImages(testNotes[noteId + 1].image_list);
        }
    }, [noteId]);

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
        const currentNoteId = testNotes[noteId].id;

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
        if (isAllNotesTagged(newTagData, testNotes.length)) {
            // TODO: 调用API提交数据
        }
    };

    // 获取当前笔记的已保存评论标签
    const getCurrentNoteSavedOpinions = () => {
        const currentNoteId = testNotes[noteId].id;
        return tagData[currentNoteId]?.commentOpinions || [];
    };

    // 检查当前笔记和评论是否都已添加标签（不修改状态）
    const checkCurrentNoteTagged = () => {
        // 检查笔记标签是否已添加
        if (!noteOpinion) {
            return false;
        }

        // 获取当前笔记的评论列表
        const currentComments = testNotes[noteId].comments;

        // 获取评论标签（从commentListRef获取当前状态，而不是从已保存的数据中获取）
        const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];

        // 检查评论标签数量是否与评论数量一致，且都不为空
        if (currentOpinions.length < currentComments.length) {
            return false;
        }

        // 检查是否有空的评论标签
        const emptyOpinions = currentOpinions.filter((opinion: string) => !opinion);
        if (emptyOpinions.length > 0) {
            return false;
        }

        return true;
    };

    // 用于UI交互的检查函数，会设置错误消息
    const isCurrentNoteTagged = () => {
        // 检查笔记标签是否已添加
        if (!noteOpinion) {
            setError("请先标记当前笔记");
            return false;
        }

        // 获取当前笔记的评论标签
        const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];
        const currentComments = testNotes[noteId].comments;

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
        // 获取当前笔记的评论标签
        const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];
        const currentComments = testNotes[noteId].comments;

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
            [testNotes[noteId].id]: {
                noteId: testNotes[noteId].id,
                noteOpinion,
                commentOpinions: currentOpinions
            }
        };

        // 检查是否已为所有笔记添加标签
        const taggedNoteIds = Object.keys(completeTagData);
        if (taggedNoteIds.length < testNotes.length) {
            return false;
        }

        // 检查每个笔记是否都有有效标签
        for (let i = 0; i < testNotes.length; i++) {
            const note = testNotes[i];
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
        if (noteId < testNotes.length - 1) {
            // 获取当前笔记的评论标签
            const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];

            // 保存当前笔记的标签数据
            const currentNoteId = testNotes[noteId].id;
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
            const nextNoteId = testNotes[nextNoteIndex].id;

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
            const currentNoteId = testNotes[noteId].id;
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
            const prevNoteId = testNotes[prevNoteIndex].id;

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

    const handleSubmit = () => {
        if (!isSubmitting && allTagged) {
            // 获取当前笔记的评论标签
            const currentOpinions = commentListRef.current?.getCurrentOpinions() || [];

            // 构建完整的标签数据，包含当前笔记的标签
            const completeTagData: TagData = {
                ...tagData,
                [testNotes[noteId].id]: {
                    noteId: testNotes[noteId].id,
                    noteOpinion: noteOpinion || "",
                    commentOpinions: currentOpinions
                }
            };

            // 提交所有标签数据
            console.log("提交所有标签数据:", completeTagData);
            // TODO: 调用API提交数据
            setIsSubmitting(true);
            setTimeout(() => setIsSubmitting(false), 3000);
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center p-8">
            <div className="w-full max-w-[1400px] min-w-[1200px] h-[900px] max-h-[90vh] min-h-[900px] flex flex-col bg-base-100 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-2 px-8 pt-8">
                    <Title title={testNotes[noteId].title} tags={testNotes[noteId].tags} />
                    <div className="ml-32">
                        <ThemeSwitcher />
                    </div>
                </div>

                <div className="divider my-0" />

                <div className="flex-1 flex flex-row mt-4 min-h-0 px-8 pb-8">
                    <div className="flex flex-col w-1/2 pr-4">
                        <div className="flex flex-col h-full">
                            <div>
                                <Images images={testNotes[noteId].image_list} />
                            </div>
                            <div className="flex-grow overflow-y-auto mt-2">
                                <NoteContent content={testNotes[noteId].content} />
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
                                    comments={testNotes[noteId].comments}
                                    onSubmit={(opinions) => {
                                        setIsSubmitting(true);
                                        handleCommentSubmit(opinions);
                                        setTimeout(() => setIsSubmitting(false), 500);
                                    }}
                                    savedOpinions={getCurrentNoteSavedOpinions()}
                                    showWarning={showWarning}
                                />
                            </div>
                            <div className="h-8 flex flex-row justify-between items-center mt-2">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {!noteOpinion ? "笔记未标记" : "笔记已标记"} | 
                                    评论已标记 {getCurrentNoteSavedOpinions().filter(opinion => opinion).length}/{testNotes[noteId].comments.length}
                                </div>
                                <div className="h-full flex items-center">
                                    {error && (
                                        <div className="text-error">{error}</div>
                                    )}
                                    {showWarning && !error && (
                                        <div className="text-error">
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
                                    totalNum={testNotes.length}
                                    submitDisabled={!allTagged || isSubmitting}
                                />
                            </div>
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
        </div>
    );
}

export default App;
