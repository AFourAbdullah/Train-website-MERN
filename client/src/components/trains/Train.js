import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import Carousel from "react-material-ui-carousel";
import "./Train.css";
import { toast } from "react-toastify";
import {
  addTrainForBooking,
  clearErrors,
  getTrain,
} from "../../actions/trainActions";
const Train = () => {
  const { trainId } = useParams();
  const { loading, error, train } = useSelector((state) => state.singleTrain);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [seats, setSeats] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingHandler = () => {
    if (!isAuthenticated) {
      toast.error("Please login for payment");
      return;
    }
    if (seats === 0) {
      toast.error("Please book at least one seat");
      return;
    }
    dispatch(addTrainForBooking(trainId, seats));
    navigate("/trainInfo");
  };
  const increaseQuantity = () => {
    if (train.numOfSeats <= seats) {
      return;
    }
    const qty = seats + 1;
    setSeats(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= seats) {
      return;
    }

    const qty = seats - 1;
    setSeats(qty);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }

    dispatch(getTrain(trainId));
  }, [dispatch, error, toast]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="ProductDetails">
          <div>
            <Carousel className="carousel">
              {train.images &&
                train.images.map((item, i) => (
                  <img
                    src={item.url}
                    className="CarouselImage"
                    key={item.url}
                    alt="trainImage"
                  />
                ))}
            </Carousel>
          </div>

          <div>
            <div className="detailsBlock1">
              <h2>{train.name}</h2>
              <p>Train Number: {train._id}</p>
            </div>
            <div className="detailsBlock2">
              <h2>Starting City: {train.startingCity}</h2>
              <h2>Destination: {train.destination}</h2>
              <h2>Price Per Seat: {train.pricePerSeat}</h2>
            </div>
            <div className="detailsBlock3">
              <h1>{`Rs${train.pricePerSeat * seats}/-`}</h1>
              <div className="detailsBlock3-1">
                <h4>Number Of Seats Available: {train.numOfSeats}</h4>
                <div className="detailsBlock3-1-1">
                  <h5>Number Of Seats</h5>
                  <button onClick={decreaseQuantity}>-</button>
                  <p>{seats}</p>
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={train.numOfSeats < 1 ? true : false}
                  onClick={bookingHandler}
                >
                  Book Now
                </button>
              </div>
              <p>
                Status:
                <b className={train.numOfSeats < 1 ? "redColor" : "greenColor"}>
                  {train.numOfSeats < 1
                    ? "Seats Unavailable"
                    : "Seats Available"}
                </b>
              </p>
            </div>
            <div className="detailsBlock4">
              <p>Departure Date : {train.departureDay}</p>
              <p> Departure Time : {train.departureTime}</p>
              <p> Category : {train.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Train;
