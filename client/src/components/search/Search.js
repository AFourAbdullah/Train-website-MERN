import React, { useEffect, useRef, useState } from "react";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { getTrains } from "../../actions/trainActions";
import Trains from "../trains/Trains";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Search = () => {
  const [startingCity, setstartingCity] = useState("");
  const [destination, setdestination] = useState("");
  const [category, setcategory] = useState("");
  const [date, setdate] = useState();

  const ref = useRef();
  const cities = [
    "Karachi",
    "Lahore",
    "Multan",
    "Peshawar",
    "Quetta",
    "Rawalpindi",
    "Sialkot",
    "Islamabad",
    "Kotri",
    "Mirpur Khas",
  ];
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { loading, error, trains, resultsPerPage, trainsCount } = useSelector(
  //   (state) => state.train
  // );
  // useEffect(() => {
  //   dispatch(getTrains(destination, startingCity, keyword));
  // }, []);
  // console.log(trains);
  // if (destination || startingCity || keyword) {
  //   dispatch(getTrains(destination, startingCity, keyword));
  // }
  const categories = ["Business", "Economical"];
  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  const submiHandler = (e) => {
    e.preventDefault();
    if (!startingCity || !destination) {
      return toast.error("All fields are mandatory!!");
    }
    capitalize(startingCity);
    capitalize(destination);
    // capitalize(startingCity);
    navigate(
      `/trains/${capitalize(startingCity)}/${capitalize(
        destination
      )}/${category}/${date}`
    );
    console.log(date);
  };

  return (
    <div>
      <div className="searchContainer">
        <div>
          <h4 className="searchHead">Search For Trains</h4>
        </div>
        <form className="inputDiv" onSubmit={submiHandler}>
          <select
            value={startingCity}
            onChange={(e) => setstartingCity(e.target.value)}
          >
            <option value="" key="">
              Starting City
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={destination}
            onChange={(e) => setdestination(e.target.value)}
          >
            <option value="" key="">
              Destination
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <input
            type="text"
            ref={ref}
            placeholder="Departure Date"
            onChange={(e) => setdate(e.target.value)}
            onMouseEnter={() => (ref.current.type = "date")}
            onMouseLeave={() => (ref.current.type = "text")}
          />
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="" key="">
              Category
            </option>
            {categories.map((cate, index) => (
              <option key={index} value={cate}>
                {cate}
              </option>
            ))}
          </select>
          <div>
            <button type="submit" className="searchBtn">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
