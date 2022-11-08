import {Outlet} from "react-router-dom"
import Navbar from "../navbar/Navbar";
import SearchResults from '../searchResults/SearchResults';
import './mainContainer.scss';

export default function MainContainer() {
  return (
    <div className='mainContainer'>
      <Outlet />
    </div>

  )
}