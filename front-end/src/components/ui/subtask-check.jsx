import {LuSquare, LuSquareCheckBig} from "react-icons/lu";
import {useMainTask} from "@/context/task-context.jsx";
import {useEffect, useRef, useState} from "react";

function SubtaskCheck({completedNow, id, main, children, onUpdated}) {
    const {completeSubTask} = useMainTask()
    const [completed, setCompleted] = useState(completedNow)
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const run = async () => {
            await completeSubTask(completed, id, main);

            if (onUpdated) {
                onUpdated();
            }
        };

        run();
    }, [completed]);

    return (
        completedNow ?
            <div className="flex gap-2 items-center" onClick={(e) => {
                e.stopPropagation();
                setCompleted(false)
            }} tabIndex={0}>
                <p className="sr-only">To do item uitvinken</p>
                <LuSquareCheckBig className="text-2xl bg-white shadow-sm rounded-sm"/>
                {children}
            </div> :
            <div className="flex gap-2 items-center" onClick={(e) => {
                e.stopPropagation();
                setCompleted(true)
            }} tabIndex={0}>
                <p className="sr-only">To do item afvinken</p>
                <LuSquare className="text-2xl bg-white shadow-sm rounded-sm"/>
                {children}
            </div>
    )
}

export default SubtaskCheck