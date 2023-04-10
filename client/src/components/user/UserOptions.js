import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./loginSignup/userOptions.css";
import { logout } from "../../actions/userActions";
import { toast } from "react-toastify";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const { cartItems } = useSelector((state) => state.cart);
  const options = [
    { icon: <ListAltIcon />, name: "Tickets", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    // {
    //   icon: (
    //     <ShoppingCartIcon
    //       style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
    //     />
    //   ),
    //   name: `Cart(${cartItems.length})`,
    //   func: cart,
    // },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/tickets/me");
  }
  function logoutUser() {
    // showToastMessage();

    dispatch(logout());
    // alert.success("Logout Successfully");
    navigate("/");
    toast.success("Logout Successfully");
  }
  function account() {
    navigate("/profile");
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDial tooltip example"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        style={{ zIndex: "11" }}
        direction="down"
        icon={
          <img
            alt="profile"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            className="speedDialIcon"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
            onClick={item.func}
            className="speedOptions"
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
