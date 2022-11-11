import { useContext } from 'react'
import { SinglePlayerContext } from '../../context/SinglePlayerContext'
import './backcard.scss'

export default function BackCard() {
    const { player } = useContext(SinglePlayerContext)

    const formatData = (value)=>{
        const withoutSpaces = value?.replace(" ", "")
        return withoutSpaces
    }
    return (
        <div className='backCardContainer'>
            <div className="infoContainer">
                <ul className='infoList'>
                    <li className="infoItem">
                        <div className="imgContainer flag ">
                            <img src={`assets/countryImgs/${formatData(player.country)}.png`} alt="" />
                        </div>
                        <span className="infoText">
                            {player?.country}
                        </span>
                    </li>
                    <li className="infoItem">
                        <div className="imgContainer">
                            <img src={`assets/leagueImgs/${formatData(player.league)}.jpg`} alt="" />
                        </div>
                        <span className="infoText">
                        {player?.league}
                        </span>
                    </li>
                    <li className="infoItem">
                        <div className="imgContainer">
                            <img src={`assets/teamImgs/${formatData(player.team)}.jpg`} alt="" />
                        </div>
                        <span className="infoText">
                            {player?.team}
                        </span>
                    </li>
                </ul>
                <span className='infoPosition'>{player?.position}</span>
            </div>
        </div>
    )
}
