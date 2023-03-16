import { useRef, useState } from "react"
import { useContext, useEffect } from "react"
import { RankedMatchContext } from "../../context/rankedMatchContext"
import useLoading from "../../hooks/useLoading"
import Defeat from "../../components/defeat/Defeat"
import SkeletonContainer from "../../components/skeletonContainer/SkeletonContainer"
import "./rankedMode.scss"
import QuestionInfo from "./components/questionInfo/QuestionInfo"

export default function RankedMode() {

  const {
    startGame,
    skipQuestion,
    verifyAnswer,
    timeIsOver,
    score,
    skips,
    finished } = useContext(RankedMatchContext)

  //this hook is responsible to manage a state loading
  const [loading, startLoading, stopLoading] = useLoading()
  const [loadingOption, startLoadingOption, stopLoadingOption] = useLoading()
  const [timeRemaining, setTimeRemaining] = useState(1200)

  const [className, setClassName] = useState("playerButton")
  const [selectedAnswer, setSelectedAnswer] = useState(null)


  //this is responsible to ends the game after 60 mins since it started
  useEffect(() => {
    if (timeRemaining === 0) {
      //if there is a selected answer it'll wait until reiceive the backend response
      if (!selectedAnswer)
        timeIsOver()
    } else {
      setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    }
  }, [timeRemaining, selectedAnswer])

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


  /*the function's hole is to change question and the 
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

        loading ?
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
              <QuestionInfo
                selectedAnswer={selectedAnswer}
                loadingOption={loadingOption}
                className={className}
                verifyQuestion={verifyQuestion}
              />
              <button
                disabled={(selectedAnswer && true) || (skips <= 0)}
                className="skipButton"
                onClick={() => { nextQuestion(true) }}>Skip({skips})</button>
            </>
            :
            <Defeat score={score} />
      }
    </div>
  )
}
