import './defeat.scss'

export default function Defeat() {
    return (
        <div className='defeat'>
            <div className="defeatContainer">
                <div className='containerText'>
                    <div className='defeatText'>
                        <span>Voce perdeu :( </span>
                    </div>
                    <div className='defeatText'>
                        <span>Acertou 3 vezes</span>
                    </div>
                    <div className='defeatText'>
                        <span>Parabens!!!</span>
                    </div>
                </div>
            </div>
            <button className='tryAgainButton'>Try again</button>
        </div>
    )
}
