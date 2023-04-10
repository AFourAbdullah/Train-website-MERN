import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import myDp from "../assets/myprofile.jpg";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{
                width: "20vmax",
                height: "20vmax",
                margin: "0vmax 0",
              }}
              src={myDp}
              className="avatr"
            />
            <Typography>Muhammad Abdullah Aziz</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              Trainistan is a user friendly Train Booking wesbite made by
              Muhammad Abdullah Aziz for people to book trains within Pakistan.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Social Media Accounts</Typography>
            <a href="https://www.facebook.com/" target="blank">
              <FacebookIcon className="gbSvgIcon" />
            </a>

            <a href="https://instagram.com/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
