import { Skeleton } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { makeRequest } from '../../axios'
import Modal from '../modal/Modal'
import './searchResults.scss'


export default function SearchResults() {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await makeRequest.get("/players")
                setData(response.data)
                setLoading(false)
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
                {loading ?
                    Array(21).fill(0).map((item, i) => (
                        <Skeleton
                            key={i}
                            sx={{ bgcolor: '#8b8181' }}
                            className="skeleton"
                            variant='rectangular' />
                    ))
                    :
                    data.map((item) => (
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
