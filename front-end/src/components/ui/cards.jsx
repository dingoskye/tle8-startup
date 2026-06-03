import Punaise from "@/components/ui/punaise.jsx";
import Tape from "@/components/ui/tape.jsx";

export function Card({variant, kind, children}) {
    let style = "shadow-md rounded-lg p-4 w-full h-full mx-auto relative flex flex-col gap-3 mt-2 col-span-1"

    //hierdoor kan je een variant meegeven om de kleur te bepalen
    switch (variant) {
        case "white":
            style += " bg-bg-white";
            break;
        case "primary":
            style += " bg-primary";
            break;
        case "secondary":
            style += " bg-secondary";
            break;
        case "tertiary":
            style += " bg-tertiary";
            break;
        case "quaternary":
            style += " bg-quaternary";
            break;
    }

    return (
        !kind ?
            <article className={style}>
                <Punaise/>
                {children}
            </article> :
            <section className={style}>
                <Punaise/>
                {children}
            </section>
    );
}

export function TapeCard({variant, children}) {
    let style = "w-full p-4 pb-6 rounded-lg shadow-md"

    //hierdoor kan je een variant meegeven om de kleur te bepalen
    switch (variant) {
        case "white":
            style += " bg-bg-white";
            break;
        case "primary":
            style += " bg-primary";
            break;
        case "secondary":
            style += " bg-secondary";
            break;
        case "tertiary":
            style += " bg-tertiary";
            break;
        case "quaternary":
            style += " bg-quaternary";
            break;
    }

    return (
        <section className="text-center p-1 mt-2 relative">
            <div className={style}>
                <Tape variant="big-r"/>
                <Tape variant="big-l"/>
                {children}
            </div>
        </section>
    )
}