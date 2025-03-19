import './App.css'
import Title from "./components/Title.tsx";
import { testData } from "./testData.ts";

function App() {
    return (
        <div className="m-8">
            <Title title={testData.title} tags={testData.tags} />
            <div className="divider my-[4px]" />
        </div>
    )
}

export default App
