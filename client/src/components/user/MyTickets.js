import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myTickets.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

import { useEffect } from "react";
import { clearErrors, myTickets } from "../../actions/ticketActions";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import { Typography } from "@mui/material";

const MyTickets = () => {
  const dispatch = useDispatch();

  const { loading, tickets, error } = useSelector((state) => state.myTickets);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Ticket ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "numOfSeats",
      headerName: "Number of Seats",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/ticket/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  tickets &&
    tickets.forEach((item, index) => {
      rows.push({
        numOfSeats: item.numOfSeats,
        id: item._id,
        status: item.ticketStatus,
        amount: item.FinalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myTickets());
  }, [dispatch, toast, error]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};

export default MyTickets;
