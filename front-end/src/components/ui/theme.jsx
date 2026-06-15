function ThemeColors({theme}) {
    let colors = []

    switch (theme) {
        case "default":
            colors = ["7CC1EC", "7EE572FF", "FCF457FF", "FFB6C1FF", "DDAEFEFF"]
            break
        case "natural":
            colors = ["eee4e1", "e7d8c9", "e6beae", "b2967d", "ecf8f8"]
            break
        case "dark":
            colors = ["45040c", "720714", "000000", "12562a", "063a21"]
            break
    }

    return (
        <div className="flex w-[50%]">
            {colors.length > 0 ?
                colors.map((color, key) =>
                    <div key={key} className={`w-10 h-4 border border-black`} style={{backgroundColor: `#${color}`}}/>)
                : null}
        </div>
    )
}

export default ThemeColors