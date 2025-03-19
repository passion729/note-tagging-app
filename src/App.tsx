import './App.css';
import Title from "./components/Title.tsx";
import { testComment, testContent, testImages, testTitle } from "./testData.ts";
import NoteContent from "./components/NoteContent.tsx";
import Images from "./components/Images.tsx";
import TagButton from "./components/TagButton.tsx";
import CommentList from "./components/CommentList.tsx";

function App() {
    return (
        <div className="m-8">
            <Title title={ testTitle.title } tags={ testTitle.tags }/>
            <div className="divider my-[4px]"/>

            <div className="flex flex-row">
                <div className="space-y-5 place-items-center w-1/2">
                    <Images images={testImages} />
                    <NoteContent content={ testContent }/>
                    <TagButton />
                </div>
                <div className="divider divider-horizontal" />
                <div className="w-1/2">
                    <CommentList comments={testComment} />
                </div>
            </div>

        </div>
    );
}

export default App;
