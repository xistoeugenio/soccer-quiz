import { createContext, useContext, useReducer } from "react";
import { startGame, skipQuestion, verifyAnswer } from "../actions/actionsRankedMode";
import { SinglePlayerContext } from "./SinglePlayerContext";

// Define action types as constants
const SET_MATCH_DATA = "SET_MATCH_DATA";
const SET_ERROR = "SET_ERROR";

// Define initial state
const initialState = {
  id_match: null,
  rightAnswer: null,
  options: [],
  started: true,
  finished: false,
  skips: 3,
  score: 0,
  error: null,
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_MATCH_DATA:
      return {
        ...state,
        id_match: action.payload.id_match,
        rightAnswer: action.payload.rightAnswer,
        options: action.payload.options,
        started: action.payload.started,
        finished: action.payload.finished,
        skips: action.payload.skips,
        score: action.payload.score,
        error: null,
      };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Create context and provider
export const RankedMatchContext = createContext(initialState);

export const RankedMatchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { dispatchPlayer } = useContext(SinglePlayerContext)

  return (
    <RankedMatchContext.Provider
      value={{
        id_match: state.id_match,
        rightAnswer: state.rightAnswer,
        options: state.options,
        started: state.started,
        finished: state.finished,
        skips: state.skips,
        score: state.score,
        error: state.error,
        startGame: () => startGame(dispatch, dispatchPlayer),
        skipQuestion: () => skipQuestion(dispatch, dispatchPlayer),
        verifyAnswer: (match_id, player_id) =>
          verifyAnswer(dispatch, match_id, player_id, dispatchPlayer),
      }}
    >
      {children}
    </RankedMatchContext.Provider>
  );
};
