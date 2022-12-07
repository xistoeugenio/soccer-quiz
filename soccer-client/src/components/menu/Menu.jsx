import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./menu.scss"

export function MenuActions() {
  return (
    <div className="menuActions">
      <ul className="actionsList">
        <li>
          <Link to="/about_us" className="text">About Us</Link>
        </li>
        <li>
          <Link to="/add" className="text">Add player</Link>
        </li>
        <li>
          <Link to="/players" className="text">Players</Link>
        </li>

      </ul>
    </div>
  )
}




export function MenuUser() {

  const { logout } = useContext(AuthContext)

  const handleLogout = async () => {
    logout()
  }
  return (
    <div className="menuUser">
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  )
}
