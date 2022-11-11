import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    player: {
        name: "jogador",
        country: undefined,
        team: undefined,
        league: "Premier League",
        description: undefined,
        position: undefined,
        imgPlayer: undefined
    }
};

export const SinglePlayerContext = createContext(INITIAL_STATE);

const SinglePlayerReducer = (state, action) => {
    switch (action.type) {
        case "NEW_PLAYER":
            return action.payload;
        case "RESET_PLAYER":
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const SinglePlayerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SinglePlayerReducer, INITIAL_STATE);


    return (
        <SinglePlayerContext.Provider
            value={{
                player: state.player,
                dispatch,
            }}
        >
            {children}
        </SinglePlayerContext.Provider>
    );
};