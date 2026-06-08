import {useEffect} from "react";
import {useParams} from "react-router";
import {useMainTask} from "@/context/task-context.jsx";
import Tape from "@/components/ui/tape.jsx";
import SubTaskCard from "@/components/sub-task-card.jsx";
import {FaPlus} from "react-icons/fa";
import {Card} from "@/components/ui/cards.jsx";
import {Link} from "react-router";
import DeadlineCard from "@/components/ui/deadline-card.jsx";
import Progressbar from "@/components/ui/progressbar.jsx";
import {ErrorComponent} from "@/pages/Error.jsx";

function TaskDetails() {
    const params = useParams()
    const {fetchTaskDetails, task} = useMainTask()

    const variants = [
        "primary",
        "secondary",
        "tertiary",
        "quaternary",
    ];

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Details taak";
    }, [])

    useEffect(() => {
        fetchTaskDetails(params.id)
    }, [params.id]);

    return (
        task !== null ?
            task.status ?
                <ErrorComponent code={task.status} message="Taak bestaat niet"/> :
                <div>
                    <header role="banner" className="text-center p-1 mt-2 relative">
                        <div className="bg-bg-white w-full p-4 rounded-lg shadow-md">
                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            <div className="grid grid-cols-4 grow gap-4">
                                <DeadlineCard deadline={task.deadline}/>
                                <div className="col-span-3 text-left">
                                    <h1 className="text-2xl font-headers">{task.title}</h1>
                                    <p>{task.description ?? "Geen beschrijving"}</p>
                                </div>
                            </div>
                            <div className="h-7 mt-2">
                                <Progressbar progress={task.users[0].pivot.progress}/>
                            </div>
                        </div>
                    </header>

                    {task.sub_tasks && task.sub_tasks.length > 0 ?
                        <section className="grid grid-cols-2 gap-4 mt-4">
                            {task.sub_tasks.map((sub, index) =>
                                <SubTaskCard key={index} sub={sub} variant={variants[index % variants.length]}/>)}
                        </section> :
                        <Link className="w-[50%] mx-auto h-full" to="/">
                            <div className="w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] m-auto mt-5">
                                <Card variant="tertiary" kind="s">
                                    <div className="flex justify-center items-center h-full">
                                        <FaPlus className="text-6xl"/>
                                    </div>
                                </Card>
                            </div>
                        </Link>
                    }
                </div> : <p>Taak aan het laden</p>
    )
}

export default TaskDetails