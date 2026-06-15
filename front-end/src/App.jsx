import './index.css'
import {Routes, Route} from "react-router";
import Home from "./pages/home.jsx";
import Layout from "./layout.jsx";
import TaskOverview from "@/pages/task-overview.jsx";
import TaskDetails from "@/pages/task-details.jsx";
import GroupOverview from "@/pages/group-overview.jsx";
import Welcome from "@/pages/welcome.jsx";
import {ErrorPage} from "@/pages/Error.jsx";
import GroupDetails from "@/pages/group-details.jsx";
import {CreateTask} from "@/pages/create-task.jsx";
import Profile from "@/pages/profile.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/welkom" element={<Welcome/>}/>
                <Route path="/studiegroepen" element={<GroupOverview/>}/>
                <Route path="/studiegroepen/:id" element={<GroupDetails/>}/>
                <Route path="/hoofdtaken" element={<TaskOverview/>}/>
                <Route path="/hoofdtaken/:id" element={<TaskDetails/>}/>
                <Route path="/hoofdtaak/aanmaken" element={<CreateTask/>}/>
                <Route path="/profiel" element={<Profile/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Route>
        </Routes>
    )
}

export default App
