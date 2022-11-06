import {Outlet} from "react-router-dom"
import SearchResults from '../searchResults/SearchResults';
import './mainContainer.scss';

export default function MainContainer() {
  return (
    <div className='mainContainer'>
      <Outlet />
    </div>

  )
}