import './App.css';
import { testComments, testNote } from "./testData.ts";
import NoteContent from "./components/NoteContent.tsx";
import Images from "./components/Images.tsx";
import TagButton from "./components/TagButton.tsx";
import CommentList from "./components/CommentList.tsx";
import Title from "./components/Title.tsx";
import ThemeSwitcher from "./components/ThemeSwitcher.tsx";
import NoteSwitcher from "./components/NoteSwitcher.tsx";
import { useState } from "react";

interface Note {
    id: string;
    title: string;
    desc: string;
    tags: string[];
    images: string[];
    comments: string[];
}

function App() {
    const [noteId, setNoteId] = useState(0);

    const notes = [{
        id: testNote.note_id,
        title: testNote.title,
        tags: testNote.tag_list.split(","),
        desc: testNote.desc,
        images: testNote.image_list.split(","),
        comments: testComments
    }, {
        id: testNote.note_id,
        title: testNote.title + "Next",
        tags: testNote.tag_list.split(","),
        desc: testNote.desc,
        images: testNote.image_list.split(",").slice(0, 2),
        comments: testComments.slice(0, 5)
    }];

    return (
        <div className="m-8 flex flex-col justify-center max-w-9/10 max-h-full">
            <div className="flex justify-between items-center">
                <Title title={ notes[noteId].title } tags={ notes[noteId].tags } />
                <ThemeSwitcher />
            </div>

            <div className="divider my-[4px]" />

            <div className="flex flex-row w-full mt-2 max-h-9/10">
                <div className="flex flex-col justify-between items-center w-1/2">
                    <div className="flex flex-col items-center space-y-5 max-h-9/10">
                        <Images images={ notes[noteId].images.slice(0, 3) } />
                        <div className="overflow-y-scroll">
                            <NoteContent content={ notes[noteId].desc } />
                        </div>
                    </div>
                    <div className="w-3/5 h-10">
                        <TagButton radio_name="note_tag" />
                    </div>
                </div>

                <div className="divider divider-horizontal mx-5" />

                <div className="flex flex-col justify-between items-center w-1/2">
                    <div className="h-9/10 overflow-y-scroll overscroll-y-auto">
                        <CommentList comments={ notes[noteId].comments } />
                    </div>
                    <div className="flex w-full justify-end">
                        <NoteSwitcher
                            previousNoteHandler={ () => {
                                if (noteId > 0) setNoteId(noteId - 1);
                            } }
                            nextNoteHandler={ () => {
                                if (noteId < notes.length - 1) setNoteId(noteId + 1);
                                return;
                            } }
                            submitHandler={ () => {
                                console.log("Submitted");}}
                            currentId={noteId + 1}
                            totalNum={ notes.length }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
