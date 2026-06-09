import {Card} from "@/components/ui/cards.jsx";
import {IoPerson} from "react-icons/io5";
import {Link} from "react-router";
import {LuSquare, LuSquareCheckBig} from "react-icons/lu";
import SubtaskCheck from "@/components/ui/subtask-check.jsx";

function SubTaskCard({sub, variant}) {

    return (
        <div className="col-span-1">
            <Card variant={variant}>
                <SubtaskCheck completedNow={sub.completed} id={sub.id} main={sub.main_task_id}>
                    <p className={sub.completed ? "line-through font-headers pt-2" : "font-headers pt-2"}>{sub.title}</p>
                </SubtaskCheck>
                {sub.description ? <p>{sub.description}</p> : null}
            </Card>
        </div>
    )
}

export default SubTaskCard