import './index.css'
import {Routes, Route} from "react-router";
import Home from "./pages/home.jsx";
import Layout from "./layout.jsx";
import TaskOverview from "@/pages/task-overview.jsx";
import TaskDetails from "@/pages/task-details.jsx";
import GroupOverview from "@/pages/group-overview.jsx";
import Welcome from "@/pages/welcome.jsx";
import {ErrorPage} from "@/pages/error.jsx";
import GroupDetails from "@/pages/group-details.jsx";
import Loading from "@/pages/loading.jsx";
import Register from "@/pages/register.jsx";
import Login from "@/pages/login.jsx";
import {CreateTask} from "@/pages/create-task.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/welkom" element={<Welcome/>}/>
                <Route path="/studiegroepen" element={<GroupOverview/>}/>
                <Route path="/studiegroepen/:id" element={<GroupDetails/>}/>
                <Route path="/hoofdtaken" element={<TaskOverview/>}/>
                <Route path="/hoofdtaken/:id" element={<TaskDetails/>}/>
                <Route path="/hoofdtaak/aanmaken" element={<CreateTask/>}/>
                <Route path="*" element={<ErrorPage/>}/>
                <Route path="/laden" element={<Loading/>}/>

            </Route>
        </Routes>
    )
}

export default App
