import "./sidebar.scss"
import { Search } from '@mui/icons-material';
import FlippableCard from "../flippableCard/FlippableCard";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="centerItems">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input placeholder="pesquisar por jogador" className="searchInput" />
                </div>
                <div className="containerAdd">
                    <FlippableCard />
                </div>
                <button className="buttonAdd">Adicionar</button>
            </div>
        </div>
    )
}
