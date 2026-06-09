import {LuSquare, LuSquareCheckBig} from "react-icons/lu";
import {useMainTask} from "@/context/task-context.jsx";
import {useEffect, useState} from "react";

function SubtaskCheck({completedNow, id, main, children}) {
    const {completeSubTask} = useMainTask()
    const [completed, setCompleted] = useState(completedNow)

    useEffect(() => {
        completeSubTask(completed, id, main)
    }, [completed]);

    return (
        completedNow ?
            <div className="flex gap-2 items-center" onClick={(e) => {
                e.stopPropagation();
                setCompleted(false)
            }} tabIndex={1}>
                <p className="sr-only">To do item wel af</p>
                <LuSquareCheckBig className="text-2xl bg-white shadow-sm rounded-sm"/>
                {children}
            </div> :
            <div className="flex gap-2 items-center" onClick={(e) => {
                e.stopPropagation();
                setCompleted(true)
            }} tabIndex={1}>
                <p className="sr-only">To do item niet af</p>
                <LuSquare className="text-2xl bg-white shadow-sm rounded-sm"/>
                {children}
            </div>
    )
}

export default SubtaskCheck