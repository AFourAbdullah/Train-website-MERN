const express = require("express");
const {
  createNewTicket,
  getLogedInUsersTicket,
  getSingleTicket,
  deleteTicket,
  getAllTickets,
} = require("../controllers/ticketControllers");
const {
  isAuthenticatedUser,
  authRoles,
} = require("../middleware/AuthMiddleware");
const router = express.Router();
router.post("/ticket/new", isAuthenticatedUser, createNewTicket);
router.get("/ticket/my", isAuthenticatedUser, getLogedInUsersTicket);
router.get("/ticket/:id", isAuthenticatedUser, getSingleTicket);
router.get(
  "/tickets/all",
  isAuthenticatedUser,
  authRoles("admin"),
  getAllTickets
);
router.delete(
  "/ticket/:id",
  isAuthenticatedUser,

  deleteTicket
);

module.exports = router;
