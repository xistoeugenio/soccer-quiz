import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    rightAnswer: null,
    options: [],
    score: 0,
    stop: null,
    start: true
};

export const GameContext = createContext(INITIAL_STATE);

const GameReducer = (state, action) => {
    switch (action.type) {
        case "NEW_OPTIONS":
            return {
                ...state,
                options: action.payload
            };
        case "START_GAME":
            return {
                options: action.payload,
                rightAnswer: null,
                score: 0,
                stop: false,
                start: true
            };
        case "WRONG_ANSWER":
            return {
                ...state,
                rightAnswer: false,
                score: state.score,
                stop: true,
                start: false
            };
        case "RIGHT_ANSWER":
            return {
                ...state,
                rightAnswer: true,
                score: state.score + 1,
                stop: false,
                start: true
            };
        default:
            return state;
    }
};

export const GameProvider = ({ children }) => {
    const [state, dispatchGame] = useReducer(GameReducer, INITIAL_STATE);


    return (
        <GameContext.Provider
            value={{
                rightAnswer: state.rightAnswer,
                options: state.options,
                score: state.score,
                stop: state.stop,
                start: state.start,
                dispatchGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};