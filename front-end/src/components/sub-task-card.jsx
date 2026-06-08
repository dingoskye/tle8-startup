import {Card} from "@/components/ui/cards.jsx";
import {IoPerson} from "react-icons/io5";
import {Link} from "react-router";
import {LuSquare, LuSquareCheckBig} from "react-icons/lu";

function SubTaskCard({sub, variant}) {

    return (
        <div className="col-span-1 md:col-span-1">
            <Card variant={variant}>
                <div className="flex gap-4 items-center">
                    {!sub.completed ?
                        <>
                            <p className="sr-only">To do item niet af</p>
                            <LuSquare className="text-2xl bg-white shadow-sm rounded-md"/>
                            <p className="text-center font-headers pt-2">{sub.title}</p>
                        </> :
                        <>
                            <p className="sr-only">To do item niet af</p>
                            <LuSquareCheckBig className="text-2xl bg-white shadow-sm rounded-md"/>
                            <p className="text-center font-headers pt-2 line-through">{sub.title}</p>
                        </>
                    }
                </div>
                <p>{sub.description ?? "Geen beschrijving"}</p>
            </Card>
        </div>
    )
}

export default SubTaskCard