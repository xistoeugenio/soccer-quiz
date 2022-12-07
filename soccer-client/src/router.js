import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import AddPlayer from "./components/addPlayer/AddPlayer";
import EditPlayer from "./components/editPlayer/EditPlayer"
import MainContainer from "./components/mainContainer/MainContainer";
import Navbar, { SearchBar } from "./components/navbar/Navbar";
import SearchResults from "./components/searchResults/SearchResults";
import Game from "./components/game/Game";
import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import GameMode from "./pages/gameMode/GameMode";
import AboutUs from "./pages/aboutUs/AboutUs";

const InitialPage = () => (
  <section className="PageContainer">
    <Navbar />
    <MainContainer />
  </section>
)

const PlayersPage = () => (
  <section className="PageContainer">
    <SearchBar />
    <MainContainer />
  </section>
)

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
        path: "/players",
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
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])