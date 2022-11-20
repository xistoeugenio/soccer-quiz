import { Link } from "react-router-dom"
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
    return (
      <div className="menuUser">
        <ul className="actionsList">
          <li>first</li>
          <li>second</li>
          <li>third</li>
          <li>forth</li>
          </ul>
        <button className="logout" >Logout</button>
      </div>
    )
  }
