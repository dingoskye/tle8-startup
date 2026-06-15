import Tape from "@/components/ui/tape.jsx";

function DeadlineCard({deadline}) {
    return (
        <div className="bg-deadline-red p-1 relative flex items-center col-span-1 rounded-sm shadow-md">
            <Tape variant="small-r"/>
            <Tape variant="small-l"/>
            <p className="w-full text-center font-headers text-md lg:break-all">
                {new Date(deadline).toLocaleDateString("nl-NL", {
                    day: "numeric", month: "long",
                })}</p>
        </div>
    )
}

export default DeadlineCard