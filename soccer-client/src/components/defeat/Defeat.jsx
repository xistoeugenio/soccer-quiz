import { useContext } from 'react'
import { GameContext } from '../../context/gameContext'
import './defeat.scss'

export default function Defeat() {
    const {score} = useContext(GameContext)
    return (
        <div className='defeat'>
            <div className="defeatContainer">
                <div className='containerText'>
                    <div className='defeatText'>
                        <span>Congratulations!</span>
                    </div>
                    <div className='defeatText'>
                        <span>You got it right {score} times.</span>
                    </div>
                    <div className='defeatText'>
                        <span>Good luck next time.</span>
                    </div>
                </div>
            </div>
        <a href='/quiz' className='tryAgainButton'>Try again</a>
        </div>
    )
}
