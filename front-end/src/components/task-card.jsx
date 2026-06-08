import {LuSquare, LuSquareCheckBig} from "react-icons/lu";
import {Card} from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import Progressbar from "@/components/ui/progressbar.jsx";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import DeadlineCard from "@/components/ui/deadline-card.jsx";

function TaskCard({task, kind}) {
    const [visibleTasks, setVisibleTasks] = useState(null)
    const navigation = useNavigate()

    useEffect(() => {
        const slots = kind === "full" ? 6 : 2
        const slice = kind === "full" ? 3 : 1

        if (task !== "") {
            if (task.sub_tasks !== []) {
                const unfinishedTasks = task.sub_tasks
                    .filter(sub => !sub.completed)
                    .slice(0, slice);

                const remainingSlots = slots - unfinishedTasks.length;

                const completedTasks = task.sub_tasks
                    .filter(sub => sub.completed)
                    .slice(0, remainingSlots);

                setVisibleTasks([...unfinishedTasks, ...completedTasks]);
            }
        }
    }, [task]);

    useEffect(() => {
        console.log(visibleTasks)
    }, [visibleTasks]);

    return (
        task !== "" ?
            <div className="w-[95%] mx-auto h-full" onClick={() => navigation(`/hoofdtaken/${task.id ?? 1}`)}>
                <Card variant="white">
                    <div className="gap-4 mt-2 grid grid-cols-3 grow">
                        <DeadlineCard deadline={task.deadline}/>
                        <div className="col-span-2">
                            <h2 className="text-xl font-headers text-left">{task.title}</h2>
                            <p className="text-left">{task.group.name}</p>
                        </div>
                    </div>
                    <div>
                        {visibleTasks !== null && visibleTasks.length !== 0 ? visibleTasks.map((task, index) =>
                                !task.completed ?
                                    <div className="flex gap-2 items-center">
                                        <p className="sr-only">To do item niet af</p>
                                        <LuSquare/>
                                        <p>{task.title}</p>
                                    </div> : <div className="flex gap-2 items-center">
                                        <p className="sr-only">To do item wel af</p>
                                        <LuSquareCheckBig/>
                                        <p className="line-through">{task.title}</p>
                                    </div>
                            ) :
                            <p>Geen subtaken</p>}
                    </div>
                    <div className="h-7">
                        <Progressbar progress={task.users[0].pivot.progress}/>
                    </div>
                    <Link className="sr-only" to={`/hoofdtaken/${task.id ?? 1}`}/>
                </Card>
            </div> : <div className="w-[95%] mx-auto h-[22vh] text-center">
                <Card variant="white"><p className="pt-4 text-xl">Geen taken</p></Card>
            </div>
    )
}

export default TaskCard