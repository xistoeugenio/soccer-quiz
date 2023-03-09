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
    timeIsOver,
    score,
    skips,
    started,
    finished,
    options } = useContext(RankedMatchContext)

  //this hook is responsible to manage a state loading
  const [loading1, startLoading, stopLoading] = useLoading()
  const [loadingOption1, startLoadingOption, stopLoadingOption] = useLoading()
  const [timeRemaining, setTimeRemaining] = useState(60)

  const [className, setClassName] = useState("playerButton")
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  useEffect(() => {
    if (timeRemaining === 0) {
      timeIsOver()
      return
    } else {
      setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    }
  }, [timeRemaining])

  //this is responsible for preventing the player from exiting before the game ends
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!finished) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [finished]);

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
  const verifyQuestion = async (player_id) => {
    setSelectedAnswer(player_id)
    setClassName("playerButton selected")
    await verifyAnswer(player_id)
    setClassName("playerButton")
    setSelectedAnswer(null)
  }


  return (
    <div className="game">
      {
        loading1 ?
          <SkeletonContainer /> :
          !finished ?
            <>
            <div className="header">
              <div className="score">
                <h1>score</h1>
                <h2>{score}</h2>
              </div>
              <h2>{timeRemaining}</h2>
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
                disabled={(selectedAnswer && true) || (skips <= 0)}
                className="skipButton"
                onClick={() => { nextQuestion(true) }}>Skip({skips})</button>
            </>
            :
            <Defeat score={score}/>
      }
    </div>
  )
}
