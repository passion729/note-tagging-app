import './App.css';
import Title from "./components/Title.tsx";
import { testComment, testContent, testImages, testTitle } from "./testData.ts";
import NoteContent from "./components/NoteContent.tsx";
import Images from "./components/Images.tsx";
import TagButton from "./components/TagButton.tsx";
import CommentList from "./components/CommentList.tsx";
import ThemeSwitcher from "./components/ThemeSwitcher.tsx";
import NoteSwitcher from "./components/NoteSwitcher.tsx";

function App() {
    return (
        <div className="m-12 flex flex-col h-full">
            <div className="flex justify-between items-center">
                <Title title={ testTitle.title } tags={ testTitle.tags } />
                <ThemeSwitcher />
            </div>

            <div className="divider my-[4px]" />

            <div className="flex flex-row">
                <div className="space-y-5 place-items-center basis-2/5">
                    <Images images={ testImages } />
                    <NoteContent content={ testContent } />
                    <div className="w-3/5 h-10">
                        <TagButton />
                    </div>
                    <div className="self-center">
                        <p>1 of 10</p>
                    </div>
                </div>

                <div className="divider divider-horizontal" />

                <div className="basis-3/5 justify-items-end">
                    <CommentList comments={ testComment } />
                    <NoteSwitcher />
                </div>
            </div>
        </div>
    );
}

export default App;
