import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./newTrain.css";

import { Button } from "@mui/material";

import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  clearErrors,
  getUserDetails,
  updateUserAdmin,
} from "../../actions/userActions";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Loading from "../loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const dispatch = useDispatch();

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const { user, loading, error } = useSelector((state) => state.userDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(0);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log("iddd", userId);
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setRole(user.role);
      setEmail(user.email);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, isUpdated, updateError, user, userId, navigate]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("role", role);
    myForm.set("email", email);

    dispatch(updateUserAdmin(userId, myForm));
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <>
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={updateUserSubmitHandler}
              >
                <h1>Update User</h1>

                <div>
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder=" Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <VerifiedUserIcon />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }
                >
                  Update
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
