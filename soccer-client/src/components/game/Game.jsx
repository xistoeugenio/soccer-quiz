import { CircularProgress } from "@mui/material"
import axios from "axios"
import { useRef, useState } from "react"
import { useContext, useEffect } from "react"
import { GameContext } from "../../context/gameContext"
import { SinglePlayerContext } from "../../context/SinglePlayerContext"
import BackCard from "../backCard/BackCard"
import Defeat from "../defeat/Defeat"
import "./game.scss"

export default function Game() {

  const { dispatchPlayer, player } = useContext(SinglePlayerContext)
  const { dispatchGame, score, start, options } = useContext(GameContext)
  const [loading, setLoading] = useState(false)
  const [loadingOption, setLoadingOption] = useState(false)

  console.log(player)

  const initGame = async () => {
    setLoading(true)
    try {
      const response = await axios.get(process.env.REACT_APP_URL_API + "api/game")
      const data = response.data
      dispatchGame({ type: "START_GAME", payload: data.all })
      dispatchPlayer({
        type: "NEW_PLAYER", payload: {
          team: data.team,
          country: data.country,
          league: data.league
        }
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

  }

  const nextQuestion = async () => {
    setLoadingOption(true)
    try {
      const response = await axios.get(process.env.REACT_APP_URL_API + "api/game")
      const data = response.data
      dispatchGame({ type: "NEW_OPTIONS", payload: data.all })
      dispatchPlayer({
        type: "NEW_PLAYER", payload: {
          team: data.team,
          country: data.country,
          league: data.league
        }
      })
      setLoadingOption(data && false)
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
    setLoadingOption(true)
    try {
      const response = await axios.post(process.env.REACT_APP_URL_API + "api/game/" + id)
      verifyQuestion(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="game">
      {
        loading ?
          <CircularProgress /> :
          start ?
            <>
              <p>{score}</p>
                <div className="gamerContainer">
                  {loadingOption? <CircularProgress />: 
                  <>
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
                  </>
                  }
                </div>
              <button className="skipButton" onClick={() => { nextQuestion(true) }}>Skip</button>
            </>
            :
            <Defeat />
      }
    </div>
  )
}
