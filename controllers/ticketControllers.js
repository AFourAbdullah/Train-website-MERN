const asyncHandler = require("express-async-handler");
const ticketModel = require("../models/ticketModel");
const trainModels = require("../models/trainModels");
const ErrorHandler = require("../utils/ErrorHandler");

const createNewTicket = asyncHandler(async (req, res, next) => {
  const trainDetails = await trainModels.findOne({
    _id: req.body.trainBooked.train,
  });
  console.log(trainDetails);
  if (trainDetails) {
    const { ticketStatus, trainBooked, numOfSeats, FinalPrice } = req.body;

    const ticket = await ticketModel.create({
      user: req.user._id,
      ticketStatus,
      trainBooked,
      numOfSeats,
      FinalPrice,
    });
    if (ticket.ticketStatus === "Booked") {
      updateSeats(ticket.trainBooked.train, ticket.numOfSeats);
    }

    res.status(201).json({
      success: true,
      ticket,
      trainDetails,
    });
  }
});
//get single ticket
const getSingleTicket = asyncHandler(async (req, res, next) => {
  const ticket = await ticketModel.findById(req.params.id);
  if (!ticket) {
    return next(new ErrorHandler("ticket not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    ticket,
  });
});

//get all ticket
const getAllTickets = asyncHandler(async (req, res, next) => {
  const tickets = await ticketModel.find();
  if (!tickets) {
    return next(new ErrorHandler("ticket not found with this id", 404));
  }

  // let totalWOrth;
  // tickets.forEach((t)=>(totalWOrth+=t.FinalPrice))
  res.status(200).json({
    success: true,
    tickets,
  });
});

//get tikcets og loged in users
const getLogedInUsersTicket = asyncHandler(async (req, res, next) => {
  const tickets = await ticketModel.find({ user: req.user._id });
  let totalCostOfTickets;
  tickets.forEach((t) => (totalCostOfTickets += t.price));
  res.status(200).json({
    tickets,
    totalCostOfTickets: totalCostOfTickets,
  });
});

//delete ticket --admin
const deleteTicket = asyncHandler(async (req, res, next) => {
  const ticket = await ticketModel.findById(req.params.id);
  if (!ticket) {
    return next(new ErrorHandler("ticket not found with this id", 404));
  }
  await ticket.remove();
  res.status(200).json({
    success: true,
  });
});

async function updateSeats(id, quantity) {
  const train = await trainModels.findById(id);

  train.numOfSeats -= quantity;

  await train.save({ validateBeforeSave: false });
}
module.exports = {
  createNewTicket,
  deleteTicket,
  getSingleTicket,
  getLogedInUsersTicket,
  getAllTickets,
};
