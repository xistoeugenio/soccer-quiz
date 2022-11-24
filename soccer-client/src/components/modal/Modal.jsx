import "./modal.scss"
import FlippableCard from "../flippableCard/FlippableCard"
import { Close, Delete, Edit } from "@mui/icons-material"
import { useEffect, useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { SinglePlayerContext } from "../../context/SinglePlayerContext"
import { Skeleton } from "@mui/material"
import { AuthContext } from "../../context/AuthContext"

export default function Modal({ setShowModal, currentPlayer }) {

    const [loading, setLoading] = useState(true)
    const { dispatchPlayer } = useContext(SinglePlayerContext)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL_API + "api/players/" + currentPlayer)
                dispatchPlayer({ type: "NEW_PLAYER", payload: response.data })
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currentPlayer])

    const alertMessage = () => {
        alert("You must be an admin to add, update or delete any data. thank you for understanding!")
    }

    return (
        <div className="modalContainer" >
            <Close className="iconClose" onClick={() => { setShowModal(false) }} />
            {loading ?
                <Skeleton
                    className="skeletonCard"
                    sx={{ bgcolor: '#8b8181' }}
                    variant='rectangular'
                />
                : <FlippableCard />}
            {
                currentUser &&
                <div className="containerBottom">
                    <button className="deleteButton" onClick={() => { alertMessage() }}>
                        <Delete className="icon" />
                    </button>
                    <button className="editButton" onClick={() => { alertMessage() }}>
                        <Edit className="icon" />
                    </button>
                </div>
            }

        </div>
    )
}
