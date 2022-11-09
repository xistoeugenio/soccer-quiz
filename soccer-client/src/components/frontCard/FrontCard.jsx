import { useContext } from 'react'
import { SinglePlayerContext } from '../../context/SinglePlayerContext'
import './frontCard.scss'

export default function FrontCard() {
    const { player } = useContext(SinglePlayerContext)

    return (
        <div className="frontCardContainer">
            <div className='infoContainer'>
                <div className="imgContainer">
                    <img src={player?.imgPlayer} alt="" />
                </div>
                <p className='infoDescription'>
                    {player?.description}
                </p>
                <p className='infoName'>
                    {player?.name}
                </p>
            </div>

        </div>
    )
}
