import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import SearchResults from "./components/searchResults/SearchResults";
import "./app.scss";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

//importing pages
import AddPlayer from "./pages/addPlayer/AddPlayer";
import EditPlayer from "./pages/editPlayer/EditPlayer"
import GameMode from "./pages/gameMode/GameMode";
import AboutUs from "./pages/aboutUs/AboutUs";
import RankedMode from "./pages/rankedMode/RankedMode";
import Game from "./pages/game/Game";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import InitialPage from "./pages/initialPage/InitialPage";
import PlayersPage from "./pages/playersPage/PlayersPage";


//this Protect router is responsible to protect 
//some routers if the user is not logged in
const ProtectRouter = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to="/login" />
  }
  return children
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialPage />,
    children: [
      {
        path: "/",
        element:
          <Link to="/game_mode" className="playButton">Play</Link>,
      },
      {
        path: "/game_mode",
        element: <GameMode />
      },
      {
        path: "/about_us",
        element: <AboutUs />
      },
    ],
  },
  {
    path: "/players",
    element: <PlayersPage />,
    children: [
      {
        path: "/players/",
        element: <SearchResults />,
      },
    ],
  },
  {
    path: "/add",
    element:
      <ProtectRouter>
        <AddPlayer />
      </ProtectRouter>
  },
  {
    path: "/edit",
    element:
      <ProtectRouter>
        <EditPlayer />
      </ProtectRouter>
  },
  {
    path: "/quiz",
    element: <Game />
  },
  {
    path: "/ranked",
    element:
      <ProtectRouter>
        <RankedMode />
      </ProtectRouter>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])