import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";
import Pagination from "react-js-pagination";
import TrainCard from "./TrainCard";
import "./trains.css";
import { getTrains } from "../../actions/trainActions";
import { useParams } from "react-router-dom";

const Trains = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pricePerSeat, setpricePerSeat] = useState([0, 2500]);
  const [ratings, setRatings] = useState(0);
  // const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const setCurrentPageNum = (e) => {
    setCurrentPage(e);
    console.log(e);
  };
  const {
    loading,
    error,
    trains,
    resultPerPage,
    trainsCount,
    filteredtrainsCount,
  } = useSelector((state) => state.trains);
  const { startingCity, destination, category, date } = useParams();

  useEffect(() => {
    dispatch(
      getTrains(
        category,
        startingCity,
        destination,
        pricePerSeat,
        currentPage,
        date
      )
    );
    console.log("train are : " + trains);
  }, [category, startingCity, destination, pricePerSeat, currentPage]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="trains">
          {trains &&
            trains.map((train) => {
              return <TrainCard key={train._id} train={train} />;
            })}
          {resultPerPage < filteredtrainsCount && (
            <div
              className="paginationBox"
              style={{
                marginTop: trains.length < 5 && "200px",
                marginRight: trains.length < 5 && "100px",
              }}
            >
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredtrainsCount}
                onChange={setCurrentPageNum}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Trains;
