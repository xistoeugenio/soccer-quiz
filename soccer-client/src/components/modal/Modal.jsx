import "./modal.scss"
import FlippableCard from "../flippableCard/FlippableCard"
import { Close, Delete, Edit } from "@mui/icons-material"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"

export default function Modal({ setShowModal, currentPlayer }) {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8800/api/players/" + currentPlayer)
                setData(response.data) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currentPlayer])
    return (
        <div className="modalContainer" >
            <Close className="iconClose" onClick={() => { setShowModal(false) }} />
            <FlippableCard/>
            <div className="containerBottom">
                <Delete className="icon" />
                <Edit className="icon" />
            </div>
        </div>
    )
}
