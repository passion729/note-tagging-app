import './App.css';
import { testComment, testContent, testImages, testTitle } from "./testData.ts";
import NoteContent from "./components/NoteContent.tsx";
import Images from "./components/Images.tsx";
import TagButton from "./components/TagButton.tsx";
import CommentList from "./components/CommentList.tsx";
import Title from "./components/Title.tsx";
import ThemeSwitcher from "./components/ThemeSwitcher.tsx";
import NoteSwitcher from "./components/NoteSwitcher.tsx";

function App() {
    return (
        <div className="m-8 flex flex-col justify-center max-w-9/10">
            <div className="flex justify-between items-center">
                <Title title={ testTitle.title } tags={ testTitle.tags } />
                <ThemeSwitcher />
            </div>

            <div className="divider my-[4px]" />

            <div className="flex flex-row">
                <div className="space-y-5 place-items-center basis-1/2">
                    <Images images={ testImages.slice(0, 3)} />
                    <NoteContent content={ testContent } />
                    <div className="w-3/5 h-10">
                        <TagButton radio_name="note_tag" />
                    </div>
                </div>

                <div className="divider divider-horizontal" />

                <div className="basis-1/2">
                    <CommentList comments={ testComment } />
                </div>
            </div>

            <div className="flex justify-end mt-3">
                <NoteSwitcher />
            </div>


        </div>
    );
}

export default App;
