import './index.css'
import {Routes, Route} from "react-router";
import Home from "./pages/home.jsx";
import Layout from "./layout.jsx";
import TaskOverview from "@/pages/task-overview.jsx";
import TaskDetails from "@/pages/task-details.jsx";
import GroupOverview from "@/pages/group-overview.jsx";
import {CreateTask} from "@/pages/create-task.jsx";
import {SubmitTest} from "@/pages/submitTest.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/studiegroep/:id" element={<GroupOverview/>}/>
                <Route path="/hoofdtaken" element={<TaskOverview/>}/>
                <Route path="/hoofdtaken/:id" element={<TaskDetails/>}/>
                <Route path="/taak-aanmaken" element={<CreateTask/>}/>
                <Route path="/submit-test" element={<SubmitTest/>}/>
            </Route>
        </Routes>
    )
}

export default App
