import {LuSquare, LuSquareCheckBig} from "react-icons/lu";
import {Card} from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import Progressbar from "@/components/ui/progressbar.jsx";
import {Link} from "react-router";

function TaskCard({task}) {
    // console.log(task.progress)

    return (
        task !== "" ?
            <Link className="w-[95%] mx-auto h-full" to={`/hoofdtaken/${task.id ?? 1}`}>
                <Card variant="white">
                    <div className="gap-4 mt-2 grid grid-cols-3 grow">
                        <div
                            className="bg-deadline-red p-1 relative flex items-center col-span-1 rounded-sm shadow-md">
                            <Tape variant="small-r"/>
                            <Tape variant="small-l"/>
                            <p className="w-full text-center font-headers text-md lg:break-all">
                                {new Date(task.deadline).toLocaleDateString("nl-NL", {
                                    day: "numeric", month: "long",
                                })}</p>
                        </div>
                        <div className="col-span-2">
                            <h2 className="text-xl font-headers text-left">{task.title}</h2>
                            <p className="text-left">{task.group.name}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="sr-only">To do item niet af</p>
                            <LuSquare/>
                            <p>Taak 1</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="sr-only">To do item wel af</p>
                            <LuSquareCheckBig/>
                            <p className="line-through">Taak 2</p>
                        </div>
                    </div>
                    <div className="h-7">
                        <Progressbar progress={task.users[0].pivot.progress}/>
                    </div>

                </Card>
            </Link> : <div className="w-[95%] mx-auto h-[22vh] text-center">
                <Card variant="white"><p className="pt-4 text-xl">Geen taken</p></Card>
            </div>
    )
}

export default TaskCard