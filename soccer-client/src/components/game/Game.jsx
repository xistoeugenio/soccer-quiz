import axios from "axios"
import { useRef } from "react"
import { useContext, useEffect } from "react"
import { useState } from "react"
import { GameContext } from "../../context/gameContext"
import { SinglePlayerContext } from "../../context/SinglePlayerContext"
import BackCard from "../backCard/BackCard"
import "./game.scss"

export default function Game() {
  const [response, setResponse] = useState("")

  const { dispatchPlayer, player } = useContext(SinglePlayerContext)
  const { dispatchGame, score, start, options } = useContext(GameContext)
  console.log(player)

  const initGame = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/game")
      const data = response.data
      dispatchGame({ type: "START_GAME", payload: data.all })
      dispatchPlayer({
        type: "NEW_PLAYER", payload: {
          team: data.team,
          country: data.country,
          league: data.league
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

  const nextQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/game")
      const data = response.data
      dispatchGame({ type: "NEW_OPTIONS", payload: data.all })
      dispatchPlayer({
        type: "NEW_PLAYER", payload: {
          team: data.team,
          country: data.country,
          league: data.league
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const render = useRef(true)
  useEffect(() => {
    if (render.current) {
      render.current = false
      initGame()
    }
  }, [])

  const verifyQuestion = (value) => {
    switch (value) {
      case "right":
        dispatchGame({ type: "RIGHT_ANSWER" })
        nextQuestion()
        break;
      case "wrong":
        dispatchGame({ type: "WRONG_ANSWER" })
        break
      default:
        break;
    }
  }

  const sendQuestion = async (id) => {
    try {
      const response = await axios.post("http://localhost:8800/api/game/" + id)
      setResponse(response.data)
      verifyQuestion(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="game">
      {start &&
        <>
          <p>{score}</p>
          <div className="gamerContainer">
            <div className="gamerRight">
              <BackCard />
            </div>
            <div className="gamerLeft">
              <div className="playersContainer">
                {options.map((player) => (
                  <button className="playerButton" onClick={() => { sendQuestion(player.id) }}>{player.name}</button>
                ))}
              </div>
            </div>
            <p>{response}</p>
          </div>
          <button className="skipButton" onClick={() => { nextQuestion() }}>Skip</button>
        </>}
    </div>
  )
}
