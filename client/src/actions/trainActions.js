import {
  ADD_TO_BOOKING,
  ADMIN_TRAIN_FAIL,
  ADMIN_TRAIN_REQUEST,
  ADMIN_TRAIN_SUCCESS,
  ALL_TRAINS_FAIL,
  ALL_TRAINS_REQUEST,
  ALL_TRAINS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_TRAIN_FAIL,
  DELETE_TRAIN_REQUEST,
  DELETE_TRAIN_SUCCESS,
  NEW_TRAIN_FAIL,
  NEW_TRAIN_REQUEST,
  NEW_TRAIN_SUCCESS,
  TRAIN_DETAILS_FAIL,
  TRAIN_DETAILS_REQUEST,
  TRAIN_DETAILS_SUCCESS,
  UPDATE_TRAIN_FAIL,
  UPDATE_TRAIN_REQUEST,
  UPDATE_TRAIN_SUCCESS,
} from "../constants/trainConstants";
import axios from "axios";

export const getTrains =
  (
    category = "",
    startingCity = "",
    destination = "",
    price = [0, 2500],
    currentPage = 1,
    date = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_TRAINS_REQUEST });
      let link = `/api/v1/trains?page=${currentPage}`;
      console.log("page received by action is" + currentPage);

      if (destination !== "" && startingCity !== "") {
        link = `/api/v1/trains?startingCity=${startingCity}&destination=${destination}&departureDay=${date}&page=${currentPage}&pricePerSeat[gte]=${price[0]}&pricePerSeat[lte]=${price[1]}&category=${category}`;
      }
      if (destination !== "" && startingCity == "") {
        link = `/api/v1/trains?destination=${destination}`;
      }
      const { data } = await axios.get(link);
      console.log(data);

      dispatch({ type: ALL_TRAINS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_TRAINS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getAdminTrains = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TRAIN_REQUEST });
    const { data } = await axios.get("/api/v1/admin/trains");

    dispatch({
      type: ADMIN_TRAIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TRAIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const createTrain = (trainData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TRAIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/trains/new`, trainData, config);
    console.log(data);
    dispatch({
      type: NEW_TRAIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TRAIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateTrain = (id, trainData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRAIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      // `https://crowded-crow-cloak.cyclic.app/api/v1/train/${id}`,
      `/api/v1/train/${id}`,
      trainData,
      config
    );
    console.log(data);
    dispatch({
      type: UPDATE_TRAIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TRAIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getTrain = (id) => async (dispatch) => {
  try {
    dispatch({ type: TRAIN_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/trains/${id}`);
    dispatch({ type: TRAIN_DETAILS_SUCCESS, payload: data.train });
  } catch (error) {
    dispatch({
      type: TRAIN_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deletingTrain = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRAIN_REQUEST });
    const { data } = await axios.delete(`/api/v1/train/${id}`);
    console.log(data);
    dispatch({ type: DELETE_TRAIN_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_TRAIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addTrainForBooking =
  (id, numberOfSeats) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/trains/${id}`);

    dispatch({
      type: ADD_TO_BOOKING,
      payload: {
        train: data.train._id,
        name: data.train.name,
        pricePerSeat: data.train.pricePerSeat,
        image: data.train.images[0].url,
        numOfSeats: data.train.numOfSeats,
        numberOfSeats,
        departure: data.train.departureDay,
        departureTime: data.train.departureTime,
      },
    });

    localStorage.setItem(
      "bookedTrain",
      JSON.stringify(getState().booking.trainBooked)
    );
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
