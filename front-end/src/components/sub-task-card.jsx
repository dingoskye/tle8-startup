import {Card} from "@/components/ui/cards.jsx";
import {IoPerson} from "react-icons/io5";
import {Link} from "react-router";
import {LuSquare, LuSquareCheckBig} from "react-icons/lu";

function SubTaskCard({sub, variant}) {

    return (
        <div className="col-span-1">
            <Card variant={variant}>
                {!sub.completed ?
                    <div className="flex gap-4 items-center">
                        <p className="sr-only">To do item niet af</p>
                        <LuSquare className="text-2xl bg-white shadow-sm rounded-sm"/>
                        <p className="font-headers pt-2">{sub.title}</p>
                    </div> :
                    <div className="flex gap-4 items-center">
                        <p className="sr-only">To do item niet af</p>
                        <LuSquareCheckBig className="text-2xl bg-white shadow-sm rounded-sm"/>
                        <p className="font-headers pt-2 line-through">{sub.title}</p>
                    </div>
                }
                {sub.description ? <p>{sub.description}</p> : null}
            </Card>
        </div>
    )
}

export default SubTaskCard