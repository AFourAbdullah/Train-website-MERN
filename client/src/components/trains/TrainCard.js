import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const TrainCard = ({ train }) => {
  return (
    <Link className="productCard" to={`/train/${train._id}`}>
      <h2>Book Now!!</h2>
      <img src={train.images[0].url} alt={train.name} />
      <div>
        <h3>{train.name}</h3>
        <h5>
          Starting City: <span>{train.startingCity}</span>
        </h5>
        <h5>
          Destination: <span>{train.destination}</span>
        </h5>

        <span>Price Per Seat:{`Rs${train.pricePerSeat}/-`}</span>
      </div>
    </Link>
  );
};

export default TrainCard;
