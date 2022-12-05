import { createContext, useState } from "react";

export const GameModeContext = createContext();

export const GameModeProvider = ({ children }) => {
    const [selectedLeagues, setSelectedLeagues] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])
    const [mode, setMode] = useState(null)

    const removeLeague = (index) => {
        setSelectedLeagues([
          ...selectedLeagues.slice(0, index),
          ...selectedLeagues.slice(index + 1, selectedLeagues.length)
        ]);
      }
    
      const handleChangeLeague = (e) => {
        const indexItem = selectedLeagues.indexOf(e.target.name)
    
        if (e.target.checked) {
          if (indexItem < 0)
          setSelectedLeagues((prev) => ([...prev, e.target.name]))
        } else {
          removeLeague(indexItem)
        }
      };
    
      const removeCountry = (index) => {
        setSelectedCountries([
          ...selectedCountries.slice(0, index),
          ...selectedCountries.slice(index + 1, selectedCountries.length)
        ]);
      }
    
      const handleChangeCountry = (e) => {
        const indexItem = selectedCountries.indexOf(e.target.name)
    
        if (e.target.checked) {
          if (indexItem < 0)
          setSelectedCountries((prev) => ([...prev, e.target.name]))
        } else {
          removeCountry(indexItem)
        }
      };
      const chooseMode = (name)=>{
        setMode(name)
      }


    return (
        <GameModeContext.Provider
            value={{
                handleChangeCountry,
                handleChangeLeague,
                selectedLeagues,
                selectedCountries,
                mode,
                chooseMode
            }}
        >
            {children}
        </GameModeContext.Provider>
    );
};