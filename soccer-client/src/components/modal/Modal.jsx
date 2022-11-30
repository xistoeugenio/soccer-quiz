import "./modal.scss"
import FlippableCard from "../flippableCard/FlippableCard"
import { Close, Delete, Edit } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { SinglePlayerContext } from "../../context/SinglePlayerContext"
import { Skeleton } from "@mui/material"
import { AuthContext } from "../../context/AuthContext"
import { makeRequest } from "../../axios"
import { Link } from "react-router-dom"

export default function Modal({ setShowModal, currentPlayer }) {

    const [loading, setLoading] = useState(true)
    const { dispatchPlayer } = useContext(SinglePlayerContext)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await makeRequest.get("/players/" + currentPlayer)
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

    const deletePlayer = async () => {
        try {
            await makeRequest.delete("/players/" + currentPlayer)
            document.location.reload()
        } catch (error) {
            alertMessage()
            console.log(error)
        }
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
                    <button className="deleteButton" onClick={deletePlayer}>
                        <Delete className="icon" />
                    </button>
                    <Link to="/edit"><button className="editButton">

                        <Edit className="icon" />

                    </button></Link>
                </div>
            }

        </div>
    )
}
