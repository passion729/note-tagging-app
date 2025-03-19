import './App.css';
import Title from "./components/Title.tsx";
import { testContent, testImages, testTitle } from "./testData.ts";
import NoteContent from "./components/NoteContent.tsx";
import Images from "./components/Images.tsx";
import TagButton from "./components/TagButton.tsx";

function App() {
    return (
        <div className="m-8">
            <Title title={ testTitle.title } tags={ testTitle.tags }/>
            <div className="divider my-[4px]"/>
            <div className="space-y-5 place-items-center">
                <Images images={testImages} />
                <NoteContent content={ testContent }/>
                <TagButton />
            </div>
        </div>
    );
}

export default App;
