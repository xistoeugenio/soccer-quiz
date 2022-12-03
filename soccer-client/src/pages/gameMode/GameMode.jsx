import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GameModeContext } from "../../context/GameModeContext"
import { countries, listLeagues } from "../../dataPlayers"
import "./gameMode.scss"

export default function GameMode() {
  const [showCustom, setShowCustom] = useState(false)
  const [showError, setShowError] = useState(false)
  const {
    handleChangeCountry,
    handleChangeLeague,
    selectedLeagues,
    selectedCountries,
    mode,
    chooseMode
  } = useContext(GameModeContext)

  const navigate = useNavigate()

  console.log([...selectedLeagues, ...selectedCountries, mode])

  const changeMode = (mode) => {
    switch (mode) {
      case "brazilian":
        navigate("/quiz")
        chooseMode(mode)
        break;
      case "custom":
        setShowCustom(true)
        chooseMode(mode)
        break;

      default:
        navigate("/quiz")
        chooseMode(null)
        break;
    }
  }

  const startGame = (e) => {
    e.preventDefault()
    if (!selectedLeagues.length || !selectedCountries.length) {
      setShowError(true)
    } else {
      navigate("/quiz")
    }

  }



  return (
    <div className="gameModeContainer">
      {!showCustom ? <div className="optionsMode">
        <button className="defaultBtn" onClick={() => { changeMode() }}>Default</button>
        <button className="brazilianBtn" onClick={() => { changeMode("brazilian") }}>Brazilian mode</button>
        <button className="customBtn" onClick={() => { changeMode("custom") }}>Custom mode</button>
      </div>
        :
        <form className="CustomMode" onSubmit={startGame}>
          <fieldset className="leagueContainer">
            <legend>league</legend>
            {listLeagues.map((league) => (
              <>
                <input
                  type="checkbox"
                  id={league.title}
                  onChange={handleChangeLeague}
                  name={league.title}
                  checked = {selectedLeagues.includes(league.title)}
                />
                <label htmlFor={league.title}>{league.title}</label><br />
              </>
            ))}
          </fieldset>
          <fieldset className="CountryContainer" >
            <legend>Country</legend>
            {countries.map((country) => (
              <>
                <input
                  type="checkbox"
                  id={country.id}
                  onChange={handleChangeCountry}
                  name={country.title}
                  checked = {selectedCountries.includes(country.title)}
                />
                <label htmlFor={country.id}>{country.title}</label><br />
              </>
            ))}
          </fieldset>
          {showError && <p>you must mark at least a league and a Country</p>}
          <button type="submit">start</button>
        </form>}
    </div>
  )
}
