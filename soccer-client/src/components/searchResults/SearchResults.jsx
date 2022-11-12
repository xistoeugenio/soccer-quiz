import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Modal from '../modal/Modal'
import './searchResults.scss'


export default function SearchResults() {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL_API +"api/players")
                setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    console.log(process.env.REACT_APP_URL_API)


    return (
        <div className='resultsContainer'>
            <div className="playersContainer">
                {data.map((item) => (
                    <div className='smallPlayerContainer'
                        onClick={
                            () => {
                                setShowModal(true)
                                setCurrentPlayer(item._id)
                            }
                        }>
                        <div className='infoContainer'>
                            <div className="imgContainer">
                                <img src={item.imgPlayer} alt="" />
                            </div>
                            <p className='infoName'>
                                {item.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <Modal setShowModal={setShowModal} currentPlayer={currentPlayer} />}
        </div>

    )
}
