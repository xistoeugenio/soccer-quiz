import { Outlet } from "react-router-dom"
import './mainContainer.scss';

export default function MainContainer() {
  return (
    <main className="backgroundImage">
      <div className='mainContainer'>
        <Outlet />
      </div>
    </main>


  )
}