import { Link } from "react-router-dom"
import { Dehaze, Search } from '@mui/icons-material';
import "./navbar.scss"
import { MenuActions, MenuUser } from "../menu/Menu";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar({ searchBar }) {
    const [openMenu, setOpenMenu] = useState(false)
    const [menuUser, setMenuUser] = useState(false)

    const { currentUser } = useContext(AuthContext)


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
                            <div className="imgContainer"
                                onClick={() => {
                                    userClick()
                                }}
                            >
                                <img src="./assets/icon_user.jpg" alt="" />
                            </div>
                        </div>
                        {menuUser && <MenuUser />}
                    </>
                    :
                    <button><Link to="/login">login</Link></button>

                }

            </div>

            {openMenu && <MenuActions />}

        </div>
    )
}

export function SearchBar() {
    return (
        <div className="Navbar search">
            <div className="leftContainer">
                <h1>Socciz</h1>
            </div>
            <div className="rightContainer">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Search for a player..."
                    />
                </div>
            </div>
        </div>
    )
}
