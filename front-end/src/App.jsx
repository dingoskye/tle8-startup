import './index.css'
import {BrowserRouter, Routes, Route} from "react-router";
import {CreateTask} from "./pages/createTask.jsx";
import {SubmitTest} from "./pages/submitTest.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateTask/>}/>
                <Route path="/submit-test" element={<SubmitTest/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
