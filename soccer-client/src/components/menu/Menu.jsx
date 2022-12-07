import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./menu.scss"

export function MenuActions({ setOpenMenu, verifyPage }) {

  return (
    <div className="menuActions">
      <ul className="actionsList">
        {verifyPage ?
          <li onClick={() => { setOpenMenu(false) }}>
            <Link to="/" className="text" >Home</Link>
          </li>
          :
          <li onClick={() => { setOpenMenu(false) }}>
            <Link to="/about_us" className="text" >About Us</Link>
          </li>
        }
        <li onClick={() => { setOpenMenu(false) }}>
          <Link to="/add" className="text">Add player</Link>
        </li>
        <li onClick={() => { setOpenMenu(false) }}>
          <Link to="/players" className="text">Players</Link>
        </li>
        <span className="version">version 1.0.0</span>
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
