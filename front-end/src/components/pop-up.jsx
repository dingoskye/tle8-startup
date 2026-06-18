import {Card} from "@/components/ui/cards.jsx";
import {Link} from "react-router";

function PopUp({
                   to = "/", children, link = true, onClose = () => {
    }
               }) {
    if (link) {
        return (
            <Link to={to}>
                <Card variant="white">
                    {children}
                </Card>
            </Link>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative z-10 w-[90%] md:w-[40vw] md:h-[50%] m-auto">
                <Card variant="white">
                    {children}
                </Card>
            </div>
        </div>
    );
}

export default PopUp;