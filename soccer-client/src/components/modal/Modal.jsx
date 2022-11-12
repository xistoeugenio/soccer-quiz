import "./modal.scss"
import FlippableCard from "../flippableCard/FlippableCard"
import { Close, Delete, Edit } from "@mui/icons-material"
import { useEffect, useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { SinglePlayerContext } from "../../context/SinglePlayerContext"
import { CircularProgress } from "@mui/material"

export default function Modal({ setShowModal, currentPlayer }) {

    const [loading, setLoading]= useState(true)
    const {dispatchPlayer} = useContext(SinglePlayerContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL_API +"api/players/" + currentPlayer)
                dispatchPlayer({type:"NEW_PLAYER", payload:response.data })
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currentPlayer])

    return (
        <div className="modalContainer" >
            <Close className="iconClose" onClick={() => { setShowModal(false) }} />
            {loading ? <CircularProgress /> :<FlippableCard />}
            <div className="containerBottom">
                <Delete className="icon" />
                <Edit className="icon" />
            </div>
        </div>
    )
}
