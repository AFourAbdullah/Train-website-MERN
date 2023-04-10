const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
  },
  trainBooked: {
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trains",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pricePerSeat: {
      type: Number,
      required: true,
    },
    departureTime: {
      type: String,
    },
    departureDay: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  ticketStatus: {
    type: String,
    default: "Booked",
  },
  numOfSeats: {
    type: Number,
    default: 0,
  },
  FinalPrice: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Ticket", ticketSchema);
