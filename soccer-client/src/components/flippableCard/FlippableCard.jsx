import Card from '../card/Card';
import './flippableCard.scss'
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react'

export default function FlippableCard() {
  const [showFront, setShowFront] = useState(true)

  return (
    <div className='flippableCardContainer'>
      <CSSTransition
        in={showFront}
        timeout={500}
        classNames="flip"
      >
        <Card onClick={() => {
          setShowFront(!showFront);
        }} />
      </CSSTransition>
    </div>
  )
}
