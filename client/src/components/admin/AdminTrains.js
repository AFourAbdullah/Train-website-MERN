import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import "./adminTrains.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "./Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import {
  clearErrors,
  deletingTrain,
  getAdminTrains,
} from "../../actions/trainActions";
import { toast } from "react-toastify";
import { DELETE_TRAIN_RESET } from "../../constants/trainConstants";

const AdminTrains = () => {
  const dispatch = useDispatch();
  const { error, trains } = useSelector((state) => state.trains);
  const {
    isDeleted,

    error: deleteError,
  } = useSelector((state) => state.modifyTrain);
  const deleteProductHandler = (id) => {
    dispatch(deletingTrain(id));
  };
  const { id } = useParams();
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
      toast.success("Train Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_TRAIN_RESET });
    }

    dispatch(getAdminTrains());
  }, [dispatch, toast, error, navigate, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Train ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "seats",
      headerName: "Number Of Seats",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price Per Seat",
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
            //{" "}
            <Link to={`/admin/train/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  trains &&
    trains.forEach((item) => {
      rows.push({
        id: item._id,
        seats: item.numOfSeats,
        price: item.pricePerSeat,
        name: item.name,
      });
    });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL TRAINS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  );
};

export default AdminTrains;
