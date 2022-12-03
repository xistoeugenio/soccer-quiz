import { createContext, useEffect, useState } from "react";

export const GameModeContext = createContext();

export const GameModeProvider = ({ children }) => {
    const [league, setLeague] = useState([])
    const [country, setCountry] = useState([])
    const [mode, setMode] = useState(null)

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
      const chooseMode = (name)=>{
        setMode(name)
      }


    return (
        <GameModeContext.Provider
            value={{
                handleChangeCountry,
                handleChangeLeague,
                league,
                country,
                mode,
                chooseMode
            }}
        >
            {children}
        </GameModeContext.Provider>
    );
};