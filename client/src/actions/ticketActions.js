import axios from "axios";
import {
  ALL_TICKET_FAIL,
  ALL_TICKET_REQUEST,
  ALL_TICKET_SUCCESS,
  CLEAR_ERRORS,
  CREATE_TICKET_FAIL,
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL,
  DELETE_TICKET_REQUEST,
  DELETE_TICKET_SUCCESS,
  MY_TICKET_FAIL,
  MY_TICKET_REQUEST,
  MY_TICKET_SUCCESS,
  TICKET_DETAILS_FAIL,
  TICKET_DETAILS_REQUEST,
  TICKET_DETAILS_SUCCESS,
} from "../constants/ticketConstants";

export const createTicket = (ticket) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TICKET_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://orange-snail-tutu.cyclic.app/api/v1/ticket/new",
      ticket,
      config
    );

    dispatch({ type: CREATE_TICKET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_TICKET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myTickets = () => async (dispatch) => {
  try {
    dispatch({ type: MY_TICKET_REQUEST });

    const { data } = await axios.get(
      "https://orange-snail-tutu.cyclic.app/api/v1/ticket/my"
    );

    dispatch({ type: MY_TICKET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_TICKET_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All tikcets (admin)
export const getAllTickets = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TICKET_REQUEST });

    const { data } = await axios.get(
      "https://orange-snail-tutu.cyclic.app/api/v1/tickets/all"
    );

    dispatch({ type: ALL_TICKET_SUCCESS, payload: data.tickets });
  } catch (error) {
    dispatch({
      type: ALL_TICKET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getTicketDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_DETAILS_REQUEST });

    const { data } = await axios.get(
      `https://orange-snail-tutu.cyclic.app/api/v1/ticket/${id}`
    );
    console.log(data.ticket);
    dispatch({ type: TICKET_DETAILS_SUCCESS, payload: data.ticket });
  } catch (error) {
    dispatch({
      type: TICKET_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
// export const updateOrder = (id, order) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_ORDER_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const { data } = await axios.put(
//       `/api/v1/admin/order/${id}`,
//       order,
//       config
//     );

//     dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_ORDER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Delete Order
export const deleteTicket = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TICKET_REQUEST });

    const { data } = await axios.delete(
      `https://orange-snail-tutu.cyclic.app/api/v1/ticket/${id}`
    );

    dispatch({ type: DELETE_TICKET_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_TICKET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
