import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { SinglePlayerContext } from "../../context/SinglePlayerContext"
import BackCard from "../backCard/BackCard"
import "./game.scss"

export default function Game() {
  const [players, setPlayers]= useState([])
  const [response, setResponse] = useState("")

  const {dispatch, player} = useContext(SinglePlayerContext)
  console.log(player)

  const initGame = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/game")
      const data = response.data
      setPlayers(data.all)
      dispatch({type:"NEW_PLAYER", payload:{player: { 
        team: data.team,
        country: data.country,
        league: data.league
      }} })
    } catch (error) {
      console.log(error)
    }
  }

  const verifyQuestion = async (id) => {
    try {
      const response = await axios.post("http://localhost:8800/api/game/" + id)
      setResponse(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="game">
      <div className="gamerContainer">
        <div className="gamerRight">
          <BackCard />
        </div>
        <div className="gamerLeft">
          <div className="playersContainer">
            {players.map((player)=>(
              <button className="playerButton" onClick={()=>{verifyQuestion(player.id)}}>{player.name}</button>
            ))}
          </div>
        </div>
        <p>{response}</p>
      </div>
      <button className="skipButton" onClick={initGame}>Skip</button>
    </div>
  )
}
