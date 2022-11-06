import './backcard.scss'

export default function BackCard() {
    return (
        <div className='backCardContainer'>
            <div className="infoContainer">
                <ul className='infoList'>
                    <li className="infoItem">
                        <div className="imgContainer flag ">
                            <img src="assets/countryImgs/belgica.png" alt=""/>
                        </div>
                        <span className="infoText">
                            Belgium
                        </span>
                    </li>
                    <li className="infoItem">
                        <div className="imgContainer">
                            <img src="assets/leagueImgs/premier.jpg" alt="" />
                        </div>
                        <span className="infoText">
                            Premier League
                        </span>
                    </li>
                    <li className="infoItem">
                        <div className="imgContainer">
                            <img src="assets/teamImgs/city.jpg" alt="" />
                        </div>
                        <span className="infoText">
                            Manchester City
                        </span>
                    </li>
                </ul>
                <span className='infoPosition'>Meio-campo</span>
            </div>
        </div>
    )
}
