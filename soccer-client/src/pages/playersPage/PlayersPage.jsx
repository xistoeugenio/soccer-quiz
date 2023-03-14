import MainContainer from '../../components/mainContainer/MainContainer'
import { SearchBar } from '../../components/navbar/Navbar'
import "./playersPage.scss"

export default function PlayersPage() {
  return (
    <section className="PageContainer">
      <SearchBar />
      <MainContainer />
    </section>
  )
}
