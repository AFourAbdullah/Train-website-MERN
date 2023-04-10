import React, { useEffect, useRef } from "react";
import "./ticket.css";
import { useSelector, useDispatch } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { clearErrors, getTicketDetails } from "../../actions/ticketActions";
import Loading from "../loading/Loading";
import { Typography } from "@mui/material";

const TicketDetails = () => {
  const { ticket, error, loading } = useSelector((state) => state.ticket);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getTicketDetails(ticketId));
    console.log(ticket);
  }, [dispatch, error, ticketId]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="orderDetailsPage" ref={componentRef}>
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Ticket #{ticket && ticket._id}
              </Typography>
              <Typography>Booking Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Customer Name:</p>
                  <span>{user && user.name}</span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Amount:</p>
                  <span>{ticket.FinalPrice && ticket.FinalPrice}</span>
                </div>
              </div>

              <Typography>Ticket Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      ticket.ticketStatus && ticket.ticketStatus === "Booked"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {ticket.ticketStatus && ticket.ticketStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Train Detail:</Typography>
              <div className="orderDetailsCartItemsContainer">
                <div key={ticket.trainBooked && ticket.trainBooked._id}>
                  <img
                    src={ticket.trainBooked && ticket.trainBooked.image}
                    alt="Product"
                  />
                  <Link
                    to={`/train/${
                      ticket.trainBooked && ticket.trainBooked.train
                    }`}
                  >
                    {ticket.trainBooked && ticket.trainBooked.name}
                  </Link>{" "}
                  <span style={{ marginRight: "20px" }}>
                    Number Of Seats Booked:{ticket.numOfSeats}
                  </span>
                  <span>
                    Price Per Seat:{" "}
                    {ticket.trainBooked && ticket.trainBooked.pricePerSeat}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handlePrint}
            id="downBtn"
            style={{
              width: "200px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              color: "white",
              margin: "20px auto",
              position: "absolute",
              top: 0,
              right: 0,
              marginTop: "150px",
              marginRight: "30px",
            }}
          >
            Download Your Ticket
          </button>
        </>
      )}
    </>
  );
};

export default TicketDetails;
