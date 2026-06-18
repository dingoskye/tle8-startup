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
import Register from "@/pages/register.jsx";
import Login from "@/pages/login.jsx";
import {CreateTask} from "@/pages/create-task.jsx";
import Loading from "@/pages/loading.jsx";
import Subtask from "@/pages/subtask.jsx";
import CreateMoment from "@/pages/create-moment.jsx";
import {InviteCode, AcceptInvite} from "@/components/invite-code.jsx";
import MomentDetails from "@/pages/moment-detail.jsx";
import CreateSubtasks from "@/pages/create-subtasks.jsx";
import CreateGroup from "@/pages/create-group.jsx"
import Profile from "@/pages/profile.jsx";
import FirstVisitGuard from "@/components/first-visit-guard.jsx";
import AuthGuard from "@/components/auth-guard.jsx";
import CreateGroup from "@/pages/create-group.jsx"
import Profile from "@/pages/profile.jsx";

function App() {

    return (
        <Routes>
            <Route element={<AuthGuard><FirstVisitGuard><Layout/></FirstVisitGuard></AuthGuard>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/code" element={<InviteCode/>}/>
                <Route path="/accepteren" element={<AcceptInvite/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registreren" element={<Register/>}/>
                <Route path="/welkom" element={<Welcome/>}/>
                <Route path="/profiel" element={<Profile/>}/>
                <Route path="/studiegroepen" element={<GroupOverview/>}/>
                <Route path="/studiegroepen/:id" element={<GroupDetails/>}/>
                <Route path="/studiegroepen/aanmaken" element={<CreateGroup/>}/>
                <Route path="/hoofdtaken" element={<TaskOverview/>}/>
                <Route path="/hoofdtaken/:id" element={<TaskDetails/>}/>
                <Route path="/hoofdtaak/aanmaken/:id" element={<CreateTask/>}/>
                <Route path="/subtaken/genereren/:id" element={<Subtask/>}/>
                <Route path="/subtaken/aanmaken/:id" element={<CreateSubtasks/>}/>
                <Route path="/hoofdtaak/aanmaken" element={<CreateTask/>}/>
                <Route path="/subtaken/genereren/:id" element={<Subtask/>}/>
                <Route path="/subtaken/aanmaken/:id" element={<CreateSubtasks/>}/>
                <Route path="/laden" element={<Loading/>}/>
                <Route path="*" element={<ErrorPage/>}/>
                <Route path="/subtaak-genereren/:id" element={<Subtask/>}/>
                <Route path="/moment-aanmaken/:id" element={<CreateMoment/>}/>
                <Route path="/moment/:id" element={<MomentDetails/>}/>
                <Route path="/laden" element={<Loading/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Route>
        </Routes>
    )
}

export default App
