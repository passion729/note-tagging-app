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

function App() {
    const [noteId, setNoteId] = useState(0);
    const [noteOpinion, setNoteOpinion] = useState("");
    const [tagData, setTagData] = useState<TagData>({});
    const commentListRef = useRef<CommentListRef>(null);

    // 加载已保存的标签数据
    useEffect(() => {
        // 清除所有数据
        clearTagData();
        
        // 重置所有状态
        setNoteOpinion("");
        commentListRef.current?.reset();
        setTagData({});
    }, []);

    const handleCommentSubmit = (opinions: string[]) => {
        const currentNoteId = testNotes[noteId].note_id;
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
            const nextNoteId = testNotes[noteId + 1].note_id;
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
            const previousNoteId = testNotes[noteId - 1].note_id;
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
        const currentNoteId = testNotes[noteId].note_id;
        return tagData[currentNoteId]?.commentOpinions || [];
    };

    return (
        <div className="h-screen w-screen flex flex-col p-8">
            <div className="flex justify-between items-center mb-4">
                <Title title={testNotes[noteId].title} tags={testNotes[noteId].tag_list.split(",")} />
                <ThemeSwitcher />
            </div>

            <div className="divider my-0" />

            <div className="flex-1 flex flex-row mt-4 min-h-0">
                <div className="flex flex-col justify-between items-center w-1/2 pr-5">
                    <div className="flex flex-col items-center space-y-5 h-full overflow-hidden">
                        <div className="w-full h-1/2">
                            <Images images={testNotes[noteId].image_list.split(",")} />
                        </div>
                        <div className="w-full h-1/2 overflow-y-auto">
                            <NoteContent content={testNotes[noteId].desc} />
                        </div>
                    </div>
                    <div className="w-3/5 h-10 mt-4">
                        <TagButton 
                            value={noteOpinion}
                            onChange={setNoteOpinion}
                        />
                    </div>
                </div>

                <div className="divider divider-horizontal mx-5" />

                <div className="flex flex-col justify-between items-center w-1/2 pl-5">
                    <div className="h-full w-full overflow-y-auto">
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
                            currentCommentsCount={testNotes[noteId].comments.length}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
