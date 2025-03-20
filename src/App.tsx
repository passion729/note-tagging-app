import './App.css';
import { testComments, testContent, testImages, testTitle } from "./testData.ts";
import NoteContent from "./components/NoteContent.tsx";
import Images from "./components/Images.tsx";
import TagButton from "./components/TagButton.tsx";
import CommentList from "./components/CommentList.tsx";
import Title from "./components/Title.tsx";
import ThemeSwitcher from "./components/ThemeSwitcher.tsx";
import NoteSwitcher from "./components/NoteSwitcher.tsx";

function App() {
    return (
        <div className="m-8 flex flex-col justify-center max-w-9/10 max-h-full">
            <div className="flex justify-between items-center">
                <Title title={ testTitle.title } tags={ testTitle.tags } />
                <ThemeSwitcher />
            </div>

            <div className="divider my-[4px]" />

            <div className="flex flex-row w-full mt-2 max-h-9/10">
                <div className="flex flex-col justify-between items-center w-1/2">
                    <div className="flex flex-col items-center space-y-5 max-h-9/10">
                        <Images images={ testImages.slice(0, 3) } />
                        <div className="overflow-y-scroll">
                            <NoteContent content={ testContent } />
                        </div>

                    </div>
                    <div className="w-3/5 h-10">
                        <TagButton radio_name="note_tag" />
                    </div>
                </div>

                <div className="divider divider-horizontal mx-5" />

                <div className="flex flex-col justify-between items-center w-1/2">
                    <div className="h-9/10 overflow-y-scroll overscroll-y-auto">
                        <CommentList comments={ testComments } />
                    </div>
                    <div className="flex w-full justify-end">
                        <NoteSwitcher />
                    </div>
                </div>

            </div>




        </div>
    );
}

export default App;
