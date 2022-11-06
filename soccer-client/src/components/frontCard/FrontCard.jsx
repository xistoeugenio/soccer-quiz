import './frontCard.scss'

export default function FrontCard({ small }) {
    return (
        <div className={small ? "frontCardContainer small" : "frontCardContainer"}>
            <div className='infoContainer'>
                <div className="imgContainer">
                    <img src="assets/playerImgs/benzema.jpg" alt="" />
                </div>
                <p className='infoDescription'>
                    Kroos is known for the range and accuracy of his distribution
                    with either foot, his technique, vision, creativity, reading of the game, and his ability to dictate play in
                    midfield or set up goals with his passing and ball delivery from set-pieces
                </p>
                <p className='infoName'>
                    Kevin De Bruyne
                </p>
            </div>

        </div>
    )
}
