import Punaise from "./punaise.jsx";
import {LuSquare, LuSquareCheckBig} from "react-icons/lu";

function TaskCard({task}) {
    return (
        <article
            className="bg-white shadow-xl rounded-lg p-4 w-[80%] mx-auto relative flex flex-col gap-3 mt-2">
            <Punaise/>
            <div className="flex gap-4 mt-2">
                <div className="bg-deadline-red p-2 relative flex items-center max-w-[18%]">
                    <div className="w-8 h-2 absolute translate-x-1/3 rotate-45 top-0 right-0 bg-nav-brown"/>
                    <div className="w-8 h-2 absolute -translate-x-1/3 rotate-45 bottom-0 left-0 bg-nav-brown"/>
                    <p className="text-center font-headers text-md">{task.deadline}</p>
                </div>
                <div>
                    <h2 className="text-xl font-headers">{task.title}</h2>
                    <p>{task.group}</p>
                </div>
            </div>
            <div>
                <div className="flex gap-2 items-center">
                    <LuSquare/>
                    <p>{task.subtasks.todo}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <LuSquareCheckBig/>
                    <p className="line-through">{task.subtasks.done}</p>
                </div>
            </div>
        </article>
    )
}

export default TaskCard