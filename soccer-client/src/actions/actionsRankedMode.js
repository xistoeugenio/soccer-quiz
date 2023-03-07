import { makeRequest } from "../axios";

export const startGame = async (dispatch, dispatchPlayer, setLoading) => {
  try {

    const { data } = await makeRequest.get("/ranked?type_function=start");
    console.log(data)
    dispatch({ type: "SET_MATCH_DATA", payload: data });
    dispatchPlayer({
      type: "NEW_PLAYER", payload: {
        team: data.info.team,
        country: data.info.country,
        league: data.info.league,
        position: data.info.position
      }
    });

  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
  //setLoading(false)
};

export const skipQuestion = async (dispatch, dispatchPlayer, match_id) => {
  try {
    const {data} = await makeRequest.get(
      `/ranked?type_function=skip&match_id=${match_id}`
    );
    console.log(data)
    dispatch({ type: "SET_MATCH_DATA", payload: data });
    dispatchPlayer({
      type: "NEW_PLAYER", payload: {
        team: data.info.team,
        country: data.info.country,
        league: data.info.league,
        position: data.info.position
      }
    });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

export const verifyAnswer = async (dispatch, match_id, player_id, dispatchPlayer) => {
  try {
    const {data} = await makeRequest.get(
      `/ranked?type_function=verify&match_id=${match_id}&player_id=${player_id}`
    );
    console.log(data)
    dispatch({ type: "SET_MATCH_DATA", payload: data });
    dispatchPlayer({
      type: "NEW_PLAYER", payload: {
        team: data.info.team,
        country: data.info.country,
        league: data.info.league,
        position: data.info.position
      }
    });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

export const timeIsOver = (dispatch)=>{
  dispatch({ type: "TIME_OVER", payload: true });
}
