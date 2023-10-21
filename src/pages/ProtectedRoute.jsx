import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../contexts/FakeAuthContext.jsx";
import {useEffect} from "react";

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const {isAuthed} = useAuthContext();

    useEffect(() => {
        if (!isAuthed) navigate("/")
    }, [isAuthed, navigate]);

    return (
        children
    );
}

export default ProtectedRoute;
