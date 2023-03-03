import { useRef, useState } from "react"
import { useContext, useEffect } from "react"
import { RankedMatchContext } from "../../context/rankedMatchContext"
import useLoading from "../../hooks/useLoading"
import BackCard from "../backCard/BackCard"
import Defeat from "../defeat/Defeat"
import SkeletonContainer from "../skeletonContainer/SkeletonContainer"
import "./rankedMode.scss"

export default function RankedMode() {
  const verify = true

  const {
    startGame,
    skipQuestion,
    verifyAnswer,
    score,
    skips,
    started,
    options } = useContext(RankedMatchContext)

  //this hook is responsible to manage a state loading
  const [loading1, startLoading, stopLoading] = useLoading()
  const [loadingOption1, startLoadingOption, stopLoadingOption] = useLoading()

  const [className, setClassName] = useState("playerButton")
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const initGame = async () => {
    startLoading()
    try {
      await startGame()
    } catch (error) {
      console.log(error)
    }
    stopLoading()
  }


  /*the function's job is to change question and the 
  loading parameter is used when we want a loading page
  before the change*/
  const nextQuestion = async (loading) => {
    startLoadingOption()
    try {
      await skipQuestion()

      setSelectedAnswer(null)
    } catch (error) {
      console.log(error)
    }
    stopLoadingOption()
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
    verifyAnswer(player_id)
    setClassName("playerButton")
    setSelectedAnswer(null)
  }


  return (
    <div className="game">
      {
        loading1 ?
          <SkeletonContainer /> :
          verify ?
            <>
              <div className="score">
                <h1>score</h1>
                <h2>{score}</h2>
              </div>
              <div className="gamerContainer">
                {loadingOption1 ? <SkeletonContainer SingleOption /> :
                  <>
                    <div className="gamerLeft">
                      <BackCard />
                    </div>
                    <div className="gamerRight">
                      <div className={selectedAnswer ? "playersContainer clicked" : "playersContainer"}>
                        {options?.map((player) => (
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
                onClick={() => { nextQuestion(true) }}>Skip({skips})</button>
            </>
            :
            <Defeat />
      }
    </div>
  )
}
