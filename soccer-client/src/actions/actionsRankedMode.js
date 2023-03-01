import { makeRequest } from "../axios";

export const startGame = async (dispatch) => {
  try {
    const matchData = await makeRequest.get("/ranked?type_function=start");
    dispatch({ type: "SET_MATCH_DATA", payload: matchData });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

export const skipQuestion = async (dispatch) => {
  try {
    const matchData = await makeRequest.get("/ranked?type_function=skip");
    dispatch({ type: "SET_MATCH_DATA", payload: matchData });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

export const verifyAnswer = async (dispatch, match_id, player_id) => {
  try {
    const matchData = await makeRequest.get(
      `/ranked?type_function=verify&match_id=${match_id}&player_id=${player_id}`
    );
    dispatch({ type: "SET_MATCH_DATA", payload: matchData });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};
