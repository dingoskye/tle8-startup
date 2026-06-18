import {Navigate, useLocation} from "react-router";
import {useApi} from "@/context/api-context.jsx";

export default function AuthGuard({children}) {
    const {loginData, loading} = useApi();
    const location = useLocation();

    if (!loginData && !loading && location.pathname !== "/login" && location.pathname !== "/registreren") {
        return (
            <Navigate
                to="/login"
                replace
                state={{from: location}}
            />
        );
    }

    return children;
}