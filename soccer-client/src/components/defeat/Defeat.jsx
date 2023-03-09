import { useContext } from 'react'
import { GameContext } from '../../context/gameContext'
import { Link } from "react-router-dom"
import './defeat.scss'


export default function Defeat({score}) {
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
                    <div className="buttons">
                        <Link to="/game_mode">
                            <button >
                                Try again
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="home">
                                Home
                            </button>
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}
