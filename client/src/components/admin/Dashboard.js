import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminTrains } from "../../actions/trainActions";
import { getAllUsers } from "../../actions/userActions";
import "./dashboard.css";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { trains } = useSelector((state) => state.trains);
  //   const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { tickets } = useSelector((state) => state.allTickets);
  let outOfStock = 0;
  trains &&
    trains.forEach((item) => {
      if (item.numOfSeats === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAdminTrains());
    dispatch(getAllUsers());
    console.log(trains.length);
  }, [dispatch]);
  let totalAmount = 0;
  tickets &&
    tickets.forEach((item) => {
      totalAmount += item.FinalPrice;
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["green"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 200],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Tickets", "Tickets Available"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, trains.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br />
              {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/trains">
              <p>Trains</p>
              <p>{trains && trains.length}</p>
            </Link>
            {/* <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
  </Link>*/}
            <Link to="/admin/users">
              <p>users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Chart type="line" data={lineState} />;
        </div>
        <div className="doughnutChart">
          <Chart type="doughnut" data={doughnutState} />;
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
