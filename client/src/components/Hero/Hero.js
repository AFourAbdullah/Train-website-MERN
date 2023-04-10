import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import {N} from 'react-router-dom'
import { HashLink } from "react-router-hash-link";

import "./hero.css";
import heroImg from "../../assets/heroImg.png";
import bgImg from "../../assets/realVg.jpg";
import img from "../../assets/mainbg.png";
import bg from "../../assets/bg.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from "swiper";
import "swiper/swiper-bundle.min.css";
const Hero = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="heroContainer">
        <div className="heroInfo">
          <div className="welcomeInfo">
            <div className="textPara">
              <h2>Welcome To Trainistan</h2>
              <h4>Your ultimate destination for train travel!</h4>
            </div>
            <HashLink to="#landing">
              <button className="bookBtn">Book Your Tickets Now!</button>
            </HashLink>
          </div>
        </div>
        <div className="overlay">
          <img src={img} alt="" />
        </div>
      </div>

      <div className="landing" id="landing">
        <img src={bg} alt="" />
        <div>
          <h6>
            From high-speed trains to scenic routes, we offer a wide range of
            options for your travel needs. Our user-friendly booking system
            makes it easy to find and book your tickets, and our expert customer
            service team is always available to answer any questions you may
            have.
          </h6>
          <div className="btnCo">
            <Link id="searchBtn2" to="/trains">
              View All Trains
            </Link>
            <Link id="searchBtn" to="/search">
              Search For Trains
            </Link>
          </div>
        </div>
      </div>

      <div className="cardsDes">
        <h4>Featured Destinations</h4>
        <hr />
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={3}
          allowSlideNext
          allowSlidePrev
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 3,
            },
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="aboutCardContainer"
          navigation
        >
          <SwiperSlide className="singleAboutcard">
            <Link to={`/city/Karachi`}>
              <img src="/karachi.jpg" alt="" />
              <h5>karachi</h5>
              <p>The City Of Lights</p>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="singleAboutcard">
            <Link to={`/city/Lahore`}>
              <img src="/lahore.jpg" alt="" />
              <h5>Lahore</h5>
              <p>Cultural heart of Pakistan</p>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="singleAboutcard">
            <Link to={`/city/Islamabad`}>
              <img src="/islu.jpg" alt="" />
              <h5>Islamabad</h5>
              <p>City Of Peace</p>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="singleAboutcard">
            <Link to={`/city/Peshawar`}>
              <img src="/pesh.jpg" alt="" />
              <h5>Peshawar</h5>
              <p>City of Flowers</p>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="singleAboutcard">
            <Link to={`/city/Quetta`}>
              <img src="/quetta.jpg" alt="" />
              <h5>Quetta</h5>
              <p>the Fruit Garden of Pakistan</p>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Hero;
