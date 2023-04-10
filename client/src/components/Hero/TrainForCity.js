import React from "react";
import { useParams } from "react-router-dom";
import { getTrains } from "../../actions/trainActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainCard from "../trains/TrainCard";
import Loading from "../loading/Loading";
import { useState } from "react";

const TrainForCity = () => {
  const { destination } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, trains } = useSelector((state) => state.trains);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrains("", "", destination, [0, 2500], 1, ""));
    console.log("des are : " + destination);
  }, [destination]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <h3 style={{ fontSize: "40px", textAlign: "Center" }}>
            Trains Enroute To {destination} are:
          </h3>
          <div className="trains">
            {trains &&
              trains.map((train) => {
                return <TrainCard key={train._id} train={train} />;
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default TrainForCity;
