import { useEffect } from "react";
import { useState } from "react";
import { leagues, list, countries } from "../../dataPlayers";
import "./addPlayer.scss";

export default function AddPlayer() {

    const [selected, setSelected] = useState("la liga")
    const [data, setData] = useState([])

    useEffect(() => {
        switch (selected) {
            case "premier league":
                setData(leagues.premierLeague);
                break
            case "la liga":
                setData(leagues.LaLiga);
                break
            default:
                setData(leagues.premierLeague)
        }

    }, [selected])
    return (
        <form className="addPlayer">
            <input type="text" placeholder="name" className="input" />
            <select name="country" id="" className="input">
                {countries.map((item) => (
                    <option
                        value={item.title}
                        key={item.title}>
                        {item.title}
                    </option>
                ))}
            </select>
            <select name="league" id="" className="input">
                {list.map((item) => (
                    <option
                        value={item.title}
                        key={item.title}>
                        {item.title}
                    </option>
                ))}
            </select>
            <select name="team" id="" className="input">
                {data.map((item) => (
                    <option
                        value={item.title}
                        key={item.id}>
                        {item.title}
                    </option>
                ))}
            </select>
            <input type="text" placeholder="position" className="input" />
            <input type="text" placeholder="description" className="input" />
            <button>Add player</button>
        </form>
    )
}
