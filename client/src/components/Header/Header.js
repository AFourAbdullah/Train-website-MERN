import React from "react";
import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/logostore.png";
import "./header.css";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/trainLogo.PNG";

const options = {
  burgerColorHover: "rgb(152, 11, 98) ",
  burgerColor: "rgb(152, 11, 79) ",
  logo,
  logoWidth: "20vmax",

  navColor1: "#10758f",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Trains",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/trains",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "2vmax",
  link1Color: "white",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  searchIconUrl: "/search",
  profileIconUrl: "/login",
  profileIconColor: "white",
  searchIconColor: "white",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  searchIconMargin: "1vmax",
};
// const[size,setSize]=useState({window.})

const Header = ({ icon }) => {
  return (
    <ReactNavbar
      {...options}
      searchIcon={true}
      SearchIconElement={BsSearch}
      profileIcon={true}
      ProfileIconElement={CgProfile}
    />
  );
};

export default Header;
