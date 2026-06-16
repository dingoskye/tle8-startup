import {Card} from "@/components/ui/cards.jsx";
import SubtaskCheck from "@/components/ui/subtask-check.jsx";

function SubTaskCard({sub, variant, onSubtaskUpdated}) {
    return (
        <div className="col-span-1">
            <Card variant={variant}>
                <SubtaskCheck onUpdated={onSubtaskUpdated} completedNow={sub.completed} id={sub.id}>
                    <p className={sub.completed ? "line-through font-headers pt-2" : "font-headers pt-2"}>{sub.title}</p>
                </SubtaskCheck>
                {sub.description ? <p>{sub.description}</p> : null}
            </Card>
        </div>
    )
}

export default SubTaskCard