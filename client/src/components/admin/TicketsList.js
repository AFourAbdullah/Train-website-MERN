import React, { useEffect } from "react";
import "./users.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Sidebar from "./Sidebar";

import {
  clearErrors,
  deleteTicket,
  getAllTickets,
} from "../../actions/ticketActions";

import { toast } from "react-toastify";
import { DELETE_TICKET_RESET } from "../../constants/ticketConstants";

const TicketList = () => {
  const dispatch = useDispatch();

  const { error, tickets } = useSelector((state) => state.allTickets);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.ticketModify
  );
  const deleteOrderHandler = (id) => {
    dispatch(deleteTicket(id));
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Ticket Deleted Successfully");
      navigate("/admin/tickets");
      dispatch({ type: DELETE_TICKET_RESET });
    }
    dispatch(getAllTickets());
  }, [dispatch, error, deleteError, isDeleted, toast, navigate]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Booked" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Train",
      type: "number",
      minWidth: 150,
      flex: 0.4,
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
          <>
            <Button onClick={() => deleteOrderHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  tickets &&
    tickets.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item && item.trainBooked.name,

        amount: item.FinalPrice,
        status: item.ticketStatus,
      });
    });

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="userListContainer">
          <h1 id="userListHeading">ALL TICKETS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="userListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default TicketList;
