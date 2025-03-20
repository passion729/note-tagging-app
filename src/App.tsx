import './App.css';
import { testNotes } from "./data/data";
import NoteContent from "./components/NoteContent";
import Images from "./components/Images";
import TagButton from "./components/TagButton";
import CommentList, { CommentListRef } from "./components/CommentList";
import Title from "./components/Title";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { NoteSwitcher } from "./components/NoteSwitcher";
import { useState, useRef, useEffect } from "react";
import { TagData } from "./types";
import { saveTagData, isAllNotesTagged, clearTagData } from "./utils/storage";
import ImagePreview from "./components/ImagePreview";

// 图片预加载函数
const preloadImages = (imageUrls: string[]) => {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
};

function App() {
    const [noteId, setNoteId] = useState(0);
    const [noteOpinion, setNoteOpinion] = useState("");
    const [tagData, setTagData] = useState<TagData>({});
    const commentListRef = useRef<CommentListRef>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // 加载已保存的标签数据
    useEffect(() => {
        // 清除所有数据
        clearTagData();
        
        // 重置所有状态
        setNoteOpinion("");
        commentListRef.current?.reset();
        setTagData({});
    }, []);

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
        const newTagData: TagData = {
            ...tagData,
            [currentNoteId]: {
                noteId: currentNoteId,
                noteOpinion,
                commentOpinions: opinions
            }
        };
        
        setTagData(newTagData);
        saveTagData(newTagData);
        
        // 如果所有笔记都已标记，可以提交到服务器
        if (isAllNotesTagged(newTagData, testNotes.length)) {
            console.log("所有笔记已标记完成，可以提交到服务器");
            // TODO: 调用API提交数据
        }
    };

    const handleNextNote = () => {
        if (noteId < testNotes.length - 1) {
            // 先提交当前笔记的评论标签
            commentListRef.current?.submit();
            
            // 切换到下一笔记
            setNoteId(noteId + 1);
            commentListRef.current?.reset();
            
            // 重置笔记标签
            setNoteOpinion("");
            
            // 如果下一笔记已有标签，加载它们
            const nextNoteId = testNotes[noteId + 1].id;
            if (tagData[nextNoteId]) {
                // 使用setTimeout确保在状态重置后再设置新值
                setTimeout(() => {
                    setNoteOpinion(tagData[nextNoteId].noteOpinion);
                }, 0);
            }
        }
    };

    const handlePreviousNote = () => {
        if (noteId > 0) {
            // 先提交当前笔记的评论标签
            commentListRef.current?.submit();
            
            // 切换到上一笔记
            setNoteId(noteId - 1);
            commentListRef.current?.reset();
            
            // 重置笔记标签
            setNoteOpinion("");
            
            // 如果上一笔记已有标签，加载它们
            const previousNoteId = testNotes[noteId - 1].id;
            if (tagData[previousNoteId]) {
                // 使用setTimeout确保在状态重置后再设置新值
                setTimeout(() => {
                    setNoteOpinion(tagData[previousNoteId].noteOpinion);
                }, 0);
            }
        }
    };

    // 获取当前笔记的已保存评论标签
    const getCurrentNoteSavedOpinions = () => {
        const currentNoteId = testNotes[noteId].id;
        return tagData[currentNoteId]?.commentOpinions || [];
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center p-8">
            <div className="w-full max-w-[1600px] min-w-[1200px] h-[900px] max-h-[90vh] min-h-[900px] flex flex-col bg-base-100 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-2 px-8 pt-8">
                    <Title title={testNotes[noteId].title} tags={testNotes[noteId].tags} />
                    <div className="ml-32">
                        <ThemeSwitcher />
                    </div>
                </div>

                <div className="divider my-0" />

                <div className="flex-1 flex flex-row mt-4 min-h-0 px-8 pb-8">
                    <div className="flex flex-col w-1/2 pr-5 min-h-0">
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className="h-[300px] mb-8">
                                <Images images={testNotes[noteId].image_list} />
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <NoteContent content={testNotes[noteId].content} />
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <div className="w-3/5">
                                <TagButton 
                                    value={noteOpinion}
                                    onChange={setNoteOpinion}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="divider divider-horizontal mx-5" />

                    <div className="flex flex-col w-1/2 pl-5 min-h-0">
                        <div className="flex-1 overflow-y-auto">
                            <CommentList 
                                ref={commentListRef}
                                comments={testNotes[noteId].comments} 
                                onSubmit={handleCommentSubmit}
                                savedOpinions={getCurrentNoteSavedOpinions()}
                            />
                        </div>
                        <div className="flex w-full justify-end mt-4">
                            <NoteSwitcher
                                previousNoteHandler={handlePreviousNote}
                                nextNoteHandler={handleNextNote}
                                submitHandler={ () => {
                                    commentListRef.current?.submit();
                                }}
                                currentId={noteId + 1}
                                totalNum={testNotes.length}
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
        </div>
    );
}

export default App;
