import {Card} from "@/components/ui/cards.jsx";
import {IoPerson} from "react-icons/io5";
import {Link} from "react-router";

function GroupCard({group, variant}) {

    return (
        <Link className="w-full" to={`/studiegroep/${group.id ?? 1}`}>
            <Card variant={variant}>
                {group.picture ?
                    <img
                        className="flex mt-3 rounded-md w-full h-25 mx-auto border-5 border-white shadow-md overflow-hidden"
                        src={group.picture} alt={`Foto van de ${group.name} groep`}/> :
                    <div
                        className="bg-bg-white text-center items-center flex mt-3 rounded-md w-full h-25 mx-auto border-5 border-white shadow-sm">
                        <IoPerson aria-label="Icoontje van poppetje (geen foto beschikbaar)"
                                  className="text-4xl w-full"/>
                    </div>}

                <p className="text-xl text-center break-all">{group.name}</p>
            </Card>
        </Link>
    )
}

export default GroupCard