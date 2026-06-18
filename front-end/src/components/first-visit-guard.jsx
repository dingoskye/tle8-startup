import {Navigate, useLocation} from "react-router";

export default function FirstVisitGuard({children}) {
    const hasVisited = localStorage.getItem("hasVisited");
    const location = useLocation();

    if (!hasVisited && location.pathname !== "/welkom") {
        return <Navigate to="/welkom" replace/>;
    }

    return children;
}