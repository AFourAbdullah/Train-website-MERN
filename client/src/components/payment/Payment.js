import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useRef } from "react";
// import { createOrder, clearErrors } from "../../actions/orderActions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors, createTicket } from "../../actions/ticketActions";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const payBtn = useRef(null);
  const ticketInfo = JSON.parse(sessionStorage.getItem("ticketInfo"));
  const { user } = useSelector((state) => state.user);
  const { trainBooked } = useSelector((state) => state.booking);
  const { error } = useSelector((state) => state.newTicket);
  const navigate = useNavigate();
  const [cardNum, setCardNum] = useState("");
  const [cvc, setCvc] = useState("");
  const [payDate, setpayDate] = useState("");
  console.log(ticketInfo.totalPrice);
  const ticket = {
    numOfSeats: trainBooked.numberOfSeats,
    FinalPrice: ticketInfo.totalPrice,
    trainBooked: {
      train: trainBooked.train,
      name: trainBooked.name,

      pricePerSeat: trainBooked.pricePerSeat,
      image: trainBooked.image,
      departureDay: trainBooked.departure,
      departureTime: trainBooked.departureTime,
    },
  };
  const handleCardNumber = (text) => {
    let formattedText = text.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }
    setCardNum(formattedText);
    return formattedText;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!cardNum || !cvc || !payDate) {
      return toast.error("Enter All Fields");
    }

    dispatch(createTicket(ticket));
    navigate("/success");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
    <>
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <input
              type="text"
              className="paymentInput"
              placeholder="0000 0000 0000 0000"
              maxLength="19"
              value={cardNum}
              onChange={
                ((e) => setCardNum(e.target.value),
                (e) => handleCardNumber(e.target.value))
              }
            />
          </div>
          <div>
            <EventIcon />
            <input
              type="text"
              className="paymentInput"
              placeholder="MM/YY"
              maxLength="5"
              value={payDate}
              onChange={(e) => setpayDate(e.target.value)}
            />
          </div>
          <div>
            <VpnKeyIcon />
            <input
              value={cvc}
              type="text"
              className="paymentInput"
              placeholder="e.g. 123"
              onChange={(e) => setCvc(e.target.value)}
              maxLength="5"
            />
          </div>

          <input
            type="submit"
            value={`Pay - Rs${ticketInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
