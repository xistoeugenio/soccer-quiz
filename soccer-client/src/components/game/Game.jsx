import Card from "../card/Card"
import "./game.scss"

export default function Game() {
  return (
    <div className="game">
      <div className="gamerContainer">
        <div className="gamerRight">
          <Card />
        </div>
        <div className="gamerLeft">
          <div className="playersContainer">
            <button className="playerButton">Neymar</button>
            <button className="playerButton">Mbappe</button>
            <button className="playerButton">Messi</button>
            <button className="playerButton">De Bruyne</button>
            <button className="playerButton">Halland</button>
          </div>
        </div>
      </div>
      <button className="skipButton">Skip</button>
    </div>
  )
}
