import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./menu.scss"

export function MenuActions() {
  return (
    <div className="menuActions">
      <ul className="actionsList">
        <li>
          <Link to="/players" className="text">Players</Link>
        </li>
        <li>
          <Link to="/add" className="text">Add player</Link>
        </li>
      </ul>
    </div>
  )
}




export function MenuUser() {

  const {logout} = useContext(AuthContext)

  const handleLogout = async () => {
    logout()
  }
  return (
    <div className="menuUser">
      <ul className="actionsList">
        <li>first</li>
        <li>second</li>
        <li>third</li>
        <li>forth</li>
      </ul>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  )
}
