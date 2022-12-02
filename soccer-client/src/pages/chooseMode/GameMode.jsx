import { useState } from "react"
import { countries, listLeagues } from "../../dataPlayers"
import "./gameMode.scss"

export default function GameMode() {
  const [showCustom, setShowCustom] = useState(false)
  const [league, setLeague] = useState([])
  const [country, setCountry] = useState([])

  const removeLeague = (index) => {
    setLeague([
      ...league.slice(0, index),
      ...league.slice(index + 1, league.length)
    ]);
  }

  const handleChangeLeague = (e) => {
    const indexItem = league.indexOf(e.target.name)

    if (e.target.checked) {
      if (indexItem < 0)
        setLeague((prev) => ([...prev, e.target.name]))
    } else {
      removeLeague(indexItem)
    }
  };

  const removeCountry = (index) => {
    setCountry([
      ...country.slice(0, index),
      ...country.slice(index + 1, country.length)
    ]);
  }

  const handleChangeCountry = (e) => {
    const indexItem = country.indexOf(e.target.name)

    if (e.target.checked) {
      if (indexItem < 0)
        setCountry((prev) => ([...prev, e.target.name]))
    } else {
      removeCountry(indexItem)
    }
  };

  console.log([...league, ...country])


  return (
    <div className="gameModeContainer">
      {!showCustom ? <div className="optionsMode">
        <button className="defaultBtn">Default</button>
        <button className="brazilianBtn">Brazilian mode</button>
        <button className="customBtn" onClick={() => { setShowCustom(true) }}>Custom mode</button>
      </div>
        :
        <form className="CustomMode">
          <fieldset className="leagueContainer">
            <legend>league</legend>
            {listLeagues.map((league) => (
              <>
                <input type="checkbox" id={league.title} onChange={handleChangeLeague} name={league.title} />
                <label htmlFor={league.title}>{league.title}</label><br />
              </>
            ))}
          </fieldset>
          <fieldset className="CountryContainer">
            <legend>Country</legend>
            {countries.map((country) => (
              <>
                <input type="checkbox" id={country.id} onChange={handleChangeCountry} name={country.title} />
                <label htmlFor={country.id}>{country.title}</label><br />
              </>
            ))}
          </fieldset>
        </form>}
    </div>
  )
}
