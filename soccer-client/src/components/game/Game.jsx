import axios from "axios"
import { useRef, useState } from "react"
import { useContext, useEffect } from "react"
import { makeRequest } from "../../axios"
import { GameContext } from "../../context/gameContext"
import { SinglePlayerContext } from "../../context/SinglePlayerContext"
import BackCard from "../backCard/BackCard"
import Defeat from "../defeat/Defeat"
import SkeletonContainer from "../skeletonContainer/SkeletonContainer"
import "./game.scss"

export default function Game() {

  const { dispatchPlayer, player } = useContext(SinglePlayerContext)
  const { dispatchGame, score, start, options } = useContext(GameContext)
  const [loading, setLoading] = useState(false)
  const [loadingOption, setLoadingOption] = useState(false)
  const [className, setClassName] = useState("playerButton")
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [match, setMacth] = useState(null)


  const initGame = async () => {
    setLoading(true)
    try {
      const response = await makeRequest.get("/game")
      const data = response.data
      dispatchGame({ type: "START_GAME", payload: data.options })
      dispatchPlayer({
        type: "NEW_PLAYER", payload: {
          team: data.info.team,
          country: data.info.country,
          league: data.info.league,
          position: data.info.position
        }
      })
      setMacth(data.id_match)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

  }


  /*the function's job is to change question and the 
  loading parameter is used when we want a loading page
  before the change*/
  const nextQuestion = async (loading) => {
    if (loading) {
      setLoadingOption(true)
    }
    try {
      const response = await makeRequest.get("/game")
      const data = response.data
      dispatchGame({ type: "NEW_OPTIONS", payload: data.options })
      dispatchPlayer({
        type: "NEW_PLAYER", payload: {
          team: data.info.team,
          country: data.info.country,
          league: data.info.league,
          position: data.info.position
        }
      })
      setMacth(data.id_match)
      setLoadingOption(data && false)
      setSelectedAnswer(null)
    } catch (error) {
      console.log(error)
    }
  }

  /*this part is responsible for executing the "initgame"
  once when the page is reloaded */
  const render = useRef(true)
  useEffect(() => {
    if (render.current) {
      render.current = false
      initGame()
    }
  }, [])


  /*checks the response returned from the backend
  and run the following functions*/
  const verifyQuestion = (value) => {
    switch (value) {
      case "right":
        dispatchGame({ type: "RIGHT_ANSWER" })
        nextQuestion()
        setClassName("playerButton right")
        break;
      case "wrong":
        dispatchGame({ type: "WRONG_ANSWER" })
        break
      default:
        break;
    }
  }


  /*send a request to backend to check the answer */
  const sendQuestion = async (id) => {
    setSelectedAnswer(id)
    setClassName("playerButton selected")
    try {
      const response = await makeRequest.get(`/game/verify?player_id=${id}&match_id=${match}`)
      verifyQuestion(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="game">
      {
        loading ?
          <SkeletonContainer /> :
          start ?
            <>
              <div className="score">
                <h1>score</h1>
                <h2>{score}</h2>
              </div>
              <div className="gamerContainer">
                {loadingOption ? <SkeletonContainer SingleOption /> :
                  <>
                    <div className="gamerLeft">
                      <BackCard />
                    </div>
                    <div className="gamerRight">
                      <div className={selectedAnswer ? "playersContainer clicked" : "playersContainer"}>
                        {options.map((player) => (
                          <button
                            key={player.id}
                            disabled={selectedAnswer && true}
                            className={selectedAnswer === player.id ? className : "playerButton"}
                            onClick={() => { sendQuestion(player.id) }}>{player.name}</button>
                        ))}
                      </div>

                    </div>
                  </>
                }
              </div>
              <button
                disabled={selectedAnswer && true}
                className="skipButton"
                onClick={() => { nextQuestion(true) }}>Skip</button>
            </>
            :
            <Defeat />
      }
    </div>
  )
}
