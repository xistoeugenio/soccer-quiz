import React, { useContext } from 'react'
import BackCard from '../../../../components/backCard/BackCard'
import SkeletonContainer from '../../../../components/skeletonContainer/SkeletonContainer'
import { RankedMatchContext } from '../../../../context/rankedMatchContext'
import "./questionInfo.scss"

export default function QuestionInfo(props) {
  const { selectedAnswer, loadingOption, className, verifyQuestion } = props
  const { options } = useContext(RankedMatchContext)
  return (
    <div className='QuestionInfoContainer'>
      {loadingOption ? <SkeletonContainer SingleOption /> :
        <>
          <div className="infoPlayer">
            <BackCard />
          </div>
          <div className="questionOptions">
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
  )
}