import {
  ADD_TO_BOOKING,
  REMOVE_BOOKEDTRAIN,
  SAVE_BOOKEDTRAIN_INFO,
} from "../constants/trainConstants";

export const bookingReducer = (state = { trainBooked: {} }, action) => {
  switch (action.type) {
    case ADD_TO_BOOKING:
      return {
        trainBooked: action.payload,
      };
    case REMOVE_BOOKEDTRAIN:
      return {
        ...state,
        trainBooked: null,
      };
    case SAVE_BOOKEDTRAIN_INFO:
      return {
        ...state,
        trainBookedInfo: action.payload,
      };
    default:
      return state;
  }
};
