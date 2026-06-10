import {LuSquare, LuSquareCheckBig} from "react-icons/lu";
import {useMainTask} from "@/context/task-context.jsx";
import {useEffect, useRef, useState} from "react";

function SubtaskCheck({completedNow, id, main, children, onUpdated}) {
    const {completeSubTask} = useMainTask()
    const [completed, setCompleted] = useState(completedNow)
    const firstRender = useRef(true);

    useEffect(() => {
        //zorgt ervoor dat hij de eerste keer niet dit doet.
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        //fetcht de taak opnieuw zodat de pagina geupdate word.
        const run = async () => {
            await completeSubTask(completed, id);

            if (onUpdated) {
                onUpdated();
            }
        };

        run(); //negeer de kringeltjes xD
    }, [completed]);

    return (
        completedNow ?
            <div className="flex gap-2 items-center" onClick={(e) => {
                e.stopPropagation(); //dit is zodat in de task-card hij niet de card ook activeert
                setCompleted(false)
            }} tabIndex={0} aria-label="To do item uitvinken">
                <LuSquareCheckBig className="text-2xl bg-white shadow-sm rounded-sm"/>
                {children}
            </div> :
            <div className="flex gap-2 items-center" onClick={(e) => {
                e.stopPropagation();
                setCompleted(true)
            }} tabIndex={0} aria-label="To do item afvinken">
                <LuSquare className="text-2xl bg-white shadow-sm rounded-sm"/>
                {children}
            </div>
    )
}

export default SubtaskCheck