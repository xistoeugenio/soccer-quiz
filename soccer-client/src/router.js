import { createBrowserRouter, Link } from "react-router-dom";
import AddPlayer from "./components/addPlayer/AddPlayer";
import MainContainer from "./components/mainContainer/MainContainer";
import Navbar, { SearchBar } from "./components/navbar/Navbar";
import SearchResults from "./components/searchResults/SearchResults";
import Game from "./components/game/Game";
import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialPage />,
    children: [
      {
        path: "/",
        element:
          <Link to="/quiz" className="playButton">Play</Link>,
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
    element: <AddPlayer />
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