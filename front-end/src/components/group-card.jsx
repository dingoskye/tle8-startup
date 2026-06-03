import {Card} from "@/components/ui/cards.jsx";
import {IoPerson} from "react-icons/io5";
import {useNavigate} from "react-router";

function GroupCard({group, variant}) {
    const navigate = useNavigate()

    return (
        <div className="w-full" onClick={() => navigate(`/studiegroep/${group.id ?? 1}`)}>
            <Card variant={variant}>
                {group.picture ?
                    <img
                        className="flex mt-3 rounded-md w-full h-25 mx-auto border-5 border-white shadow-md overflow-hidden"
                        src={group.picture} alt={`Foto van de ${group.name} groep`}/> :
                    <div
                        className="bg-bg-white text-center items-center flex mt-3 rounded-md w-full h-25 mx-auto border-5 border-white shadow-md">
                        <IoPerson aria-label="Icoontje van poppetje (geen foto beschikbaar)"
                                  className="text-4xl w-full"/>
                    </div>}

                <p className="text-xl text-center break-all">{group.name}</p>
            </Card>
        </div>
    )
}

export default GroupCard