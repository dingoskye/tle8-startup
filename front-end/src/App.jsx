import './index.css'
import {Route, Routes} from "react-router";
import Layout from "./layout.jsx";
import Subtask from "./pages/subtask.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/subtaak-aanmaken" element={<Subtask/>}/>
            </Route>
        </Routes>
    )
}

export default App
