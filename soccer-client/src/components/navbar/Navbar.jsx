import { Link } from "react-router-dom"
import { Search } from '@mui/icons-material';

import "./navbar.scss"

export default function Navbar({ searchBar }) {
    return (
        <div className="Navbar">
            <div className="leftContainer">
                Socciz
            </div>
            <div className="rightContainer">
                {searchBar === true ?
                    <>
                        <div className="searchbar">
                            <Search className="searchIcon"/>
                            <input 
                            type="text" 
                            className="searchInput"
                            placeholder="Search for a player..."
                            />
                        </div>
                    </>
                    :
                    <>
                        <Link to="/add" className="button">Add Player</Link>
                        <Link to="/players" className="button">Players</Link>
                    </>
                }
            </div>
        </div>
    )
}
