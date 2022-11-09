import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import FrontCard from '../frontCard/FrontCard'
import Modal from '../modal/Modal'
import './searchResults.scss'

export default function SearchResults() {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8800/api/players")
                setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    console.log(data)
    console.log(currentPlayer)


    return (
        <div className='resultsContainer'>
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
            {showModal && <Modal setShowModal={setShowModal} currentPlayer={currentPlayer} />}
        </div>

    )
}
