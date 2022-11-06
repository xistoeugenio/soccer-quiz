import { createBrowserRouter } from "react-router-dom";
import AddPlayer from "./components/addPlayer/AddPlayer";
import MainContainer from "./components/mainContainer/MainContainer";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainContainer />,
    },
    {
        path: "/add",
        element: <AddPlayer />
    }
])