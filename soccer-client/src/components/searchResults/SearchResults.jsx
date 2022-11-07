import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import FrontCard from '../frontCard/FrontCard'
import './searchResults.scss'

export default function SearchResults() {
    const [data, setData] = useState([])
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
    return (
        <div className='resultsContainer'>
            {data.map((item) => (
                <FrontCard small={true} data = {item}/>
            ))}
        </div>
    )
}
