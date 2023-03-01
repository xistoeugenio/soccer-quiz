import { useRef, useState } from "react"
import { useContext, useEffect } from "react"
import { RankedMatchContext } from "../../context/rankedMatchContext"
import BackCard from "../backCard/BackCard"
import Defeat from "../defeat/Defeat"
import SkeletonContainer from "../skeletonContainer/SkeletonContainer"
import "./rankedMode.scss"

export default function RankedMode() {

  const {
    startGame,
    skipQuestion,
    verifyAnswer,
    id_match,
    score,
    started,
    options } = useContext(RankedMatchContext)

  const [loading, setLoading] = useState(false)
  const [loadingOption, setLoadingOption] = useState(false)
  const [className, setClassName] = useState("playerButton")
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  
  const initGame = async () => {
    setLoading(true)
    try {
      startGame()
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
      skipQuestion()
      setLoadingOption(false)
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
  const verifyQuestion = (player_id) => {
    setSelectedAnswer(player_id)
    setClassName("playerButton selected")
    verifyAnswer(player_id, id_match)

  }


  return (
    <div className="game">
      {
        loading ?
          <SkeletonContainer /> :
          started ?
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
                            onClick={() => { verifyQuestion(player.id) }}>{player.name}</button>
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
