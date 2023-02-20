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
        <button className="defaultBtn" onClick={() => { changeMode() }}>Randon</button>
        <button className="brazilianBtn" onClick={() => { changeMode("brazilian") }}>Brazilian mode</button>
        <button className="customBtn" onClick={() => { changeMode("custom") }}>Custom mode</button>
      </div>
        :
        <>
          <form className="CustomMode" onSubmit={startGame}>
            <div className="fields">
              <fieldset className="leagueContainer">
                <legend>league</legend>
                {listLeagues.map((league) => (
                  <div className="item">
                    <input
                      type="checkbox"
                      id={league.title}
                      onChange={handleChangeLeague}
                      name={league.title}
                      checked={selectedLeagues.includes(league.title)}
                    />
                    <label htmlFor={league.title}>{league.title}</label><br />
                  </div>
                ))}
              </fieldset>
              <fieldset className="CountryContainer" >
                <legend>Country</legend>
                {countries.map((country) => (
                  <div className="item">
                    <input
                      type="checkbox"
                      id={country.id}
                      onChange={handleChangeCountry}
                      name={country.title}
                      checked={selectedCountries.includes(country.title)}
                    />
                    <label htmlFor={country.id}>{country.title}</label><br />
                  </div>
                ))}
              </fieldset>
            </div>
            <button type="submit" className="start">start</button>
            {showError && <p className="error">you must mark at least a league and a Country</p>}
          </form>

        </>
      }
    </div>
  )
}
