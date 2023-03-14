import MainContainer from '../../components/mainContainer/MainContainer'
import Navbar from '../../components/navbar/Navbar'
import "./initialPage.scss"

export default function InitialPage() {
  return (
    <section className="PageContainer">
      <Navbar />
      <MainContainer />
    </section>
  )
}
