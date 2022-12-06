import { useContext, useEffect } from "react";
import { useState } from "react";
import { leagues, countries, positions, listLeagues } from "../../dataPlayers";
import { makeRequest } from "../../axios";
import { CircularProgress } from "@mui/material";
import "../addPlayer/addPlayer.scss"
import { SinglePlayerContext } from "../../context/SinglePlayerContext";
import { useNavigate } from "react-router-dom";

export default function EditPlayer() {

    const { player } = useContext(SinglePlayerContext)

    const [selected, setSelected] = useState("la liga")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        name: player.name,
        country: player.country,
        team: player.team,
        league: player.league,
        description: player.description,
        position: player.position,
        imgPlayer: player.imgPlayer
    })

    const navigate = useNavigate()


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleLeague = (e) => {
        setSelected(e.target.value)
        if (e.target.value === "Premier League") {
            setValues({ ...values, team: "Arsenal", league: "Premier League" })
        } else if (e.target.value === "La Liga") {
            setValues({ ...values, team: "Atletico", league: "La Liga" })
        } else if (e.target.value === "Serie A") {
            setValues({ ...values, team: "Juventus", league: "Serie A" })
        }
    }

    useEffect(() => {
        switch (selected) {
            case "Premier League":
                setData(leagues.premierLeague);
                break
            case "La Liga":
                setData(leagues.LaLiga);
                break
            case "Serie A":
                setData(leagues.SerieA);
                break
            default:
                setData(leagues.premierLeague)
        }

    }, [selected])

    const alertMessage = () => {
        alert("You must be an admin to add, update or delete any data. thank you for understanding!")
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            await makeRequest.put("/players/" + player._id, values)
            navigate("/players")
        } catch (error) {
            alertMessage()
            console.log(error)
        }
        setLoading(false)

    }

    return (
        <div className="addPlayer">
            <div className="imgContainer">
                <img src={values.imgPlayer || "assets/icon_user.jpg"} alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="name"
                    className="input"
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                    required
                />
                <select name="country" id="" className="input" onChange={handleChange}>
                    {countries.map((item) => (
                        <option
                            selected={item.title === values.country}
                            value={item.title}
                            key={item.title}>
                            {item.title}
                        </option>
                    ))}
                </select>
                <select name="league" id="" className="input" onChange={handleLeague}>
                    {listLeagues.map((item) => (
                        <option
                            selected={item.title === values.league}
                            value={item.title}
                            key={item.title}>
                            {item.title}
                        </option>
                    ))}
                </select>
                <select name="team" id="" className="input" onChange={handleChange}>
                    {data.map((item) => (
                        <option
                            selected={item.title === values.team}
                            value={item.title}
                            key={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>
                <select name="position" id="" className="input" onChange={handleChange}>
                    {positions.map((item) => (
                        <option
                            selected={item.name === values.position}
                            value={item.name}
                            key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="description(optional)"
                    className="input"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                />
                <input
                    type="text"
                    placeholder="Image URL(optional)"
                    className="input"
                    name="imgPlayer"
                    onChange={handleChange}
                    value={values.imgPlayer}
                />
                {loading
                    ? <CircularProgress />
                    : <button type="submit">Update</button>}
            </form>
        </div>
    )
}