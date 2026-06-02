function Tape({variant}) {
    let style = "absolute rotate-45 bg-nav-brown opacity-[70%]"

    switch (variant) {
        case "big-r":
            style += " w-14 h-3 translate-x-1/4 top-2 right-0";
            break;
        case "big-l":
            style += " w-14 h-3 -translate-x-1/4 bottom-2 left-0";
            break;
        case "small-r":
            style += " w-7 h-1.5 translate-x-1/3 top-1 right-0";
            break;
        case "small-l":
            style += " w-7 h-1.5 -translate-x-1/3 bottom-1 left-0";
            break;
    }

    return (
        <div className={style}/>
    );
}

export default Tape