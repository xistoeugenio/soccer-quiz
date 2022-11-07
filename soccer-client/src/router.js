import { createBrowserRouter } from "react-router-dom";
import AddPlayer from "./components/addPlayer/AddPlayer";
import MainContainer from "./components/mainContainer/MainContainer";
import SearchResults from "./components/searchResults/SearchResults";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainContainer />,
        children: [
            {
              path: "/players",
              element: <SearchResults />,
            },
          ],
    },
    {
        path: "/add",
        element: <AddPlayer />
    }
])