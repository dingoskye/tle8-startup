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
        <div className="w-full h-full rounded-full border-white border-4 bg-gray-300 shadow-sm overflow-hidden">
            <div className={`h-full ${color}`} style={{width: `${progress}%`}}/>
            <p className="sr-only">Progressiebalk die laat zien dat je progressie {progress}% is</p>
        </div>
    )
}

export default Progressbar