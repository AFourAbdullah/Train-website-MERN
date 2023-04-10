import {
  ALL_TICKET_FAIL,
  ALL_TICKET_REQUEST,
  ALL_TICKET_SUCCESS,
  CLEAR_ERRORS,
  CREATE_TICKET_FAIL,
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  DELETE_TICKET_REQUEST,
  DELETE_TICKET_RESET,
  DELETE_TICKET_SUCCESS,
  MY_TICKET_FAIL,
  MY_TICKET_REQUEST,
  MY_TICKET_SUCCESS,
  TICKET_DETAILS_FAIL,
  TICKET_DETAILS_REQUEST,
  TICKET_DETAILS_SUCCESS,
  UPDATE_TICKET_FAIL,
  UPDATE_TICKET_REQUEST,
  UPDATE_TICKET_RESET,
  UPDATE_TICKET_SUCCESS,
} from "../constants/ticketConstants";
import { DELETE_TRAIN_FAIL } from "../constants/trainConstants";

export const newTicketReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TICKET_SUCCESS:
      return {
        loading: false,
        ticket: action.payload,
      };

    case CREATE_TICKET_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const myTicketsReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case MY_TICKET_REQUEST:
      return {
        loading: true,
      };
    case MY_TICKET_SUCCESS:
      return {
        loading: false,
        tickets: action.payload.tickets,
        totalCost: action.payload.totalCostOfTickets,
      };

    case MY_TICKET_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const ticketDetailsReducer = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case TICKET_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case TICKET_DETAILS_SUCCESS:
      return {
        loading: false,
        ticket: action.payload,
      };

    case TICKET_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const allTicketsReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case ALL_TICKET_REQUEST:
      return {
        loading: true,
      };
    case ALL_TICKET_SUCCESS:
      return {
        loading: false,
        tickets: action.payload,
      };

    case ALL_TICKET_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const TicketReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TICKET_REQUEST:
    case DELETE_TICKET_REQUEST:
      return {
        ...state,

        loading: true,
      };
    case UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_TICKET_FAIL:
    case DELETE_TRAIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_TICKET_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_TICKET_RESET:
      return {
        ...state,
        isDeleted: false,
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
