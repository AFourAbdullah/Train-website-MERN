import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { REMOVE_BOOKEDTRAIN } from "../../constants/trainConstants";

import "./TrainInfo.css";

const TrainInfo = () => {
  const { trainBooked } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = trainBooked.numberOfSeats * trainBooked.pricePerSeat;

  const proceedToPayment = () => {
    const data = {
      // subtotal,
      // shippingCharges,
      // tax,
      // totalPrice,
      totalPrice,
    };
    sessionStorage.setItem("ticketInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Booked Train Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Customer Name:</p>
                <span>{user.name}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Booking Details:</Typography>
            <div className="confirmCartItemsContainer">
              {trainBooked && (
                <div key={trainBooked.train}>
                  <img src={trainBooked.image} alt="Product" />
                  <Link to={`/train/${trainBooked.train}`}>
                    {trainBooked.name}
                  </Link>{" "}
                  <span>
                    Departure Date: <b>{trainBooked.departure}</b> (YY-MM-DD)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Booking Summary</Typography>

            <div className="orderSummaryTotal">
              <p>
                <b>Price Per Seat:</b>
              </p>
              <span>₹{trainBooked.pricePerSeat}</span>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Number Of Seats Booked:</b>
              </p>
              <span>{trainBooked.numberOfSeats}</span>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button className="payBtn" onClick={proceedToPayment}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainInfo;
