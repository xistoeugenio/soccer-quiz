import { Outlet } from "react-router-dom"
import './mainContainer.scss';

export default function MainContainer() {
  return (
    <main className="backgroundImage">
      <div className='mainContainer'>
        {/*the children of this component is located at router.js */}
        <Outlet />
      </div>
    </main>
  )
}