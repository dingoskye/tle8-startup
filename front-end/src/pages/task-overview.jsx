import {useEffect} from "react";
import Tape from "@/components/ui/tape.jsx";
import {useMainTask} from "@/context/task-context.jsx";
import TaskCard from "@/components/task-card.jsx";

function TaskOverview() {
    const {fetchMainTasks, mainTasks} = useMainTask()

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Takenoverzicht";
        fetchMainTasks()
    }, [])

    return (
        <div>
            <header role="banner" className="text-center p-1 mt-2 relative">
                <div className="bg-primary w-full p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-2xl font-headers">Openstaande taken</h1>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto mt-5">
                {mainTasks !== null && mainTasks.length !== 0 ? mainTasks.map((task, index) =>
                        <TaskCard kind="full" key={index} task={task}/>) :
                    <p>Geen openstaande taken</p>}
            </section>
        </div>
    )
}

export default TaskOverview