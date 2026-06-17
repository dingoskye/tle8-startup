function ThemeColors({theme}) {
    let colors = []

    switch (theme) {
        case "default":
            colors = ["bg-default-1", "bg-default-2", "bg-default-3", "bg-default-4", "bg-default-5"]
            break
        case "natural":
            colors = ["bg-natural-1", "bg-natural-2", "bg-natural-3", "bg-natural-4", "bg-natural-5"]
            break
        case "dark":
            colors = ["bg-dark-1", "bg-dark-2", "bg-dark-3", "bg-dark-4", "bg-dark-5"]
            break
    }

    return (
        <div className="flex w-[50%]">
            {colors.length > 0 ?
                colors.map((color, key) =>
                    <div key={key} className={`w-10 h-4 border border-black ${color}`}/>)
                : null}
        </div>
    )
}

export default ThemeColors