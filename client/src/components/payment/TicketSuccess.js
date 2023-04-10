import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircleSharp";
import "./success.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TicketSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Ticket has been Placed successfully </Typography>
      <Link to="/tickets/me">View Tickets</Link>
      <p>Go to Tickets option to download your ticket</p>
    </div>
  );
};

export default TicketSuccess;
