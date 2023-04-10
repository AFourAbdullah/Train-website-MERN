import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newTrainReducer,
  singleTrainReducer,
  trainModifyReducer,
  trainReducer,
} from "./reducers/trainRedcuer";
import {
  allUsersReducer,
  profileReducer,
  userDetailsReducer,
  usersReducer,
} from "./reducers/userReducers";
import { bookingReducer } from "./reducers/bookingReducers";
import {
  TicketReducer,
  allTicketsReducer,
  myTicketsReducer,
  newTicketReducer,
  ticketDetailsReducer,
} from "./reducers/ticketReducers";

const reducer = combineReducers({
  trains: trainReducer,
  user: usersReducer,
  allUsers: allUsersReducer,
  newTrain: newTrainReducer,
  singleTrain: singleTrainReducer,
  booking: bookingReducer,
  newTicket: newTicketReducer,
  modifyTrain: trainModifyReducer,
  profile: profileReducer,
  myTickets: myTicketsReducer,
  ticket: ticketDetailsReducer,
  userDetails: userDetailsReducer,
  allTickets: allTicketsReducer,
  ticketModify: TicketReducer,
});
const middleware = [thunk];

let initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
