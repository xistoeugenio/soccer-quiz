import { Add } from '@mui/icons-material'
import { Skeleton } from '@mui/material'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../axios'
import { SinglePlayerContext } from '../../context/SinglePlayerContext'
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

    /*This part is responsible to search player  */
    const { searchPlayer } = useContext(SinglePlayerContext)
    const filterPlayers = searchPlayer?.length > 0
        ? data.filter(player => player.name.toLowerCase().includes(searchPlayer.toLowerCase()))
        : data


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
                    filterPlayers.map((item) => (
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
                <Link to="/add">
                    <div className="addPlayerContainer">
                        <div className="plusContainer">
                            <Add className='icon' />
                        </div>
                    </div>
                </Link>
            </div>
            {showModal && <Modal setShowModal={setShowModal} currentPlayer={currentPlayer} />}
        </div>

    )
}
