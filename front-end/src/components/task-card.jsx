import Punaise from "@/components/ui/punaise.jsx";
import {LuSquare, LuSquareCheckBig} from "react-icons/lu";
import {Card} from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import Progressbar from "@/components/ui/progressbar.jsx";
import {useNavigate} from "react-router";

function TaskCard({task}) {
    const navigate = useNavigate()

    return (
        task !== "" ?
            <div className="w-[95%] mx-auto h-full" onClick={() => navigate(`/hoofdtaken/${task.id ?? 1}`)}>
                <Card variant="white">
                    <div className="gap-4 mt-2 grid grid-cols-3 grow">
                        <div
                            className="bg-deadline-red p-1 relative flex items-center col-span-1 rounded-sm shadow-md">
                            <Tape variant="small-r"/>
                            <Tape variant="small-l"/>
                            <p className="w-full text-center font-headers text-md lg:break-all">{task.deadline}</p>
                        </div>
                        <div className="col-span-2">
                            <h2 className="text-xl font-headers text-left">{task.title}</h2>
                            <p className="text-left">{task.group}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="sr-only">To do item niet af</p>
                            <LuSquare/>
                            <p>{task.subtasks.todo}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="sr-only">To do item wel af</p>
                            <LuSquareCheckBig/>
                            <p className="line-through">{task.subtasks.done}</p>
                        </div>
                    </div>
                    <div className="h-7">
                        <Progressbar progress={task.progress}/>
                    </div>

                </Card>
            </div> : <div className="w-[95%] mx-auto h-[22vh] text-center">
                <Card variant="white"><p className="pt-4 text-xl">Geen taken</p></Card>
            </div>
    )
}

export default TaskCard