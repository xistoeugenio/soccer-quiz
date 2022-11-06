import BackCard from '../backCard/BackCard'
import FrontCard from '../frontCard/FrontCard'
import './flipTransition.css';
import './card.scss'

export default function Card({onClick}) {
    return (
        <div className='card' onClick={onClick}>
            <div className="cardBack">
                <BackCard />
            </div>
            <div className="cardFront">
                <FrontCard />
            </div>
        </div>
    )
}
