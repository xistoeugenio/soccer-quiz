import { Link } from "react-router-dom"
import "./navbar.scss"

export default function Navbar({ searchBar }) {
    return (
        <div className="Navbar">
            <div className="leftContainer">
                Players' quiz
            </div>
            <div className="rightContainer">
                {searchBar === true ?
                    <>
                        <input type="text" />
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
