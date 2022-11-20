import { Link } from "react-router-dom"
import { Dehaze, Search } from '@mui/icons-material';

import "./navbar.scss"
import { MenuActions, MenuUser } from "../menu/Menu";
import { useState } from "react";

export default function Navbar({ searchBar }) {
    const searchClass = searchBar ? "search" : ""
    const [openMenu, setOpenMenu] = useState(false)
    const [menuUser, setMenuUser] = useState(false)

    return (
        <div className={"Navbar " + searchClass}>
            <div className="leftContainer">
                {searchBar ? <h1>Socciz</h1> :
                    <>
                        <Link to="/add" className="button">Add Player</Link>
                        <Link to="/players" className="button">Players</Link>
                        <button className="menuBtn" onClick={() => {
                            setOpenMenu(!openMenu)
                        }}>
                            <Dehaze className="icon" />
                        </button>
                    </>}

            </div>
            <div className="rightContainer">
                {searchBar === true ?
                    <div className="searchbar">
                        <Search className="searchIcon" />
                        <input
                            type="text"
                            className="searchInput"
                            placeholder="Search for a player..."
                        />
                    </div>
                    :
                    <div className="userContainer">
                        <p className="username">XistoEugenio</p>
                        <div className="imgContainer"
                            onClick={() => {
                                setMenuUser(!menuUser)
                            }}
                        >
                            <img src="./assets/xisto.jpg" alt="" />
                        </div>
                    </div>
                }
                {menuUser && <MenuUser />}
            </div>

            {openMenu && <MenuActions />}

        </div>
    )
}
