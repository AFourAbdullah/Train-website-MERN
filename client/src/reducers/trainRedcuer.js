import {
  ADMIN_TRAIN_FAIL,
  ADMIN_TRAIN_REQUEST,
  ADMIN_TRAIN_SUCCESS,
  ALL_TRAINS_FAIL,
  ALL_TRAINS_REQUEST,
  ALL_TRAINS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_TRAIN_FAIL,
  DELETE_TRAIN_REQUEST,
  DELETE_TRAIN_RESET,
  DELETE_TRAIN_SUCCESS,
  NEW_TRAIN_FAIL,
  NEW_TRAIN_REQUEST,
  NEW_TRAIN_RESET,
  NEW_TRAIN_SUCCESS,
  TRAIN_DETAILS_FAIL,
  TRAIN_DETAILS_REQUEST,
  TRAIN_DETAILS_SUCCESS,
  UPDATE_TRAIN_FAIL,
  UPDATE_TRAIN_REQUEST,
  UPDATE_TRAIN_RESET,
  UPDATE_TRAIN_SUCCESS,
} from "../constants/trainConstants";

export const trainReducer = (state = { trains: [] }, action) => {
  switch (action.type) {
    case ALL_TRAINS_REQUEST:
    case ADMIN_TRAIN_REQUEST:
      return {
        loading: true,
        trains: [],
      };
    case ALL_TRAINS_SUCCESS:
      return {
        loading: false,
        trains: action.payload.trains,
        trainsCount: action.payload.trainsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredtrainsCount: action.payload.filteredtrainsCount,
      };
    case ALL_TRAINS_FAIL:
    case ADMIN_TRAIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_TRAIN_SUCCESS:
      return {
        loading: false,
        trains: action.payload.trains,
      };
    default:
      return {
        ...state,
      };
  }
};
export const newTrainReducer = (state = { train: {} }, action) => {
  switch (action.type) {
    case NEW_TRAIN_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case NEW_TRAIN_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        train: action.payload.newTrain,
      };

    case NEW_TRAIN_RESET:
      return {
        ...state,
        success: false,
      };
    case NEW_TRAIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const singleTrainReducer = (state = { train: {} }, action) => {
  switch (action.type) {
    case TRAIN_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case TRAIN_DETAILS_SUCCESS:
      return {
        loading: false,
        train: action.payload,
      };
    case TRAIN_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const trainModifyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRAIN_REQUEST:
    case UPDATE_TRAIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TRAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_TRAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_TRAIN_FAIL:
    case UPDATE_TRAIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TRAIN_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_TRAIN_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
