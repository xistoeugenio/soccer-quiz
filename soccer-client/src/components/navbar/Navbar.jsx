import { Link, useLocation } from "react-router-dom"
import { Dehaze, Search } from '@mui/icons-material';
import "./navbar.scss"
import { MenuActions, MenuUser } from "../menu/Menu";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SinglePlayerContext } from "../../context/SinglePlayerContext";

export default function Navbar({ searchBar }) {
    const [openMenu, setOpenMenu] = useState(false)
    const [menuUser, setMenuUser] = useState(false)

    const { currentUser } = useContext(AuthContext)

    /*this part is responsible to verify the page and
     if it's about_us change the button */
    const location = useLocation()
    const verifyPage = (location.pathname.split("/")[1] === "about_us") && true


    const userClick = () => {
        if (openMenu)
            setOpenMenu(false)
        setMenuUser(!menuUser)
    }

    const hamburguerClick = () => {
        if (menuUser)
            setMenuUser(false)
        setOpenMenu(!openMenu)
    }

    return (
        <div className="Navbar">
            <div className="leftContainer">
                {verifyPage ?
                    <Link to="/" className="button home">Home</Link>
                    :
                    <Link to="/about_us" className="button about">About Us</Link>
                }
                <Link to="/add" className="button">Add Player</Link>
                <Link to="/players" className="button">Players</Link>
                <button className="menuBtn" onClick={() => {
                    hamburguerClick()
                }}>
                    <Dehaze className="icon" />
                </button>
            </div>
            <div className="rightContainer">
                {currentUser
                    ?
                    <>
                        <div className="userContainer">
                            <p className="username">{currentUser.username}</p>
                            <div className="imgContainer" onClick={() => { userClick() }}>
                                <img src="./assets/icon_user.jpg" alt="" />
                            </div>
                        </div>
                        {menuUser && <MenuUser />}
                    </>
                    :
                    <Link to="/login" className="link">
                        <button className="loginButton">Login</button>
                    </Link>

                }

            </div>

            {openMenu && <MenuActions setOpenMenu={setOpenMenu} verifyPage={verifyPage} />}

        </div>
    )
}

export function SearchBar() {
    const { setSearchPlayer, searchPlayer } = useContext(SinglePlayerContext)
     
    return (
        <div className="Navbar search">
            <div className="leftContainer">
                <a href="/">Socciz</a>
            </div>
            <div className="rightContainer">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Search for a player..."
                        onChange={e => setSearchPlayer(e.target.value)}
                        value={searchPlayer}
                    />
                </div>
            </div>
        </div>
    )
}
