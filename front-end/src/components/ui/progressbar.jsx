import {GiPlainCircle} from "react-icons/gi";

function Progressbar({progress}) {
    let color = ""

    if (Number(progress) < 25) {
        color = "bg-red-400"
    } else if (Number(progress) < 75) {
        color = "bg-orange-400"
    } else {
        color = "bg-green-400"
    }

    return (
        <div className="relative mx-auto w-[95%] h-full rounded-full border-white border-4 bg-gray-300 shadow-sm">
            <div className="overflow-hidden w-full h-full rounded-full">
                <div className={`h-full ${color}`} style={{width: `${progress}%`}}/>
            </div>
            <GiPlainCircle
                className="absolute top-1/2 -translate-y-1/2 -translate-x-15/16 text-4xl bg-white border-white border-3 rounded-full text-nav-brown shadow-sm"
                style={{left: `${progress + 5}%`}}/>
            <p className="sr-only">Progressiebalk die laat zien dat je progressie ${progress}% is</p>
        </div>
    )
}

export default Progressbar