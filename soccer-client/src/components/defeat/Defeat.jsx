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
                        <span>Voce perdeu :( </span>
                    </div>
                    <div className='defeatText'>
                        <span>Acertou {score} vezes</span>
                    </div>
                    <div className='defeatText'>
                        <span>Parabens!!!</span>
                    </div>
                </div>
            </div>
        <a href='/quiz' className='tryAgainButton'>Try again</a>
        </div>
    )
}
