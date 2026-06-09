import Tape from "@/components/ui/tape.jsx";

function InputCard({children}) {

    return (
        <div className="relative  shadow-md">
            <Tape variant="small-r"/>
            <Tape variant="small-l"/>
            {children}
        </div>
    )
}

export default InputCard