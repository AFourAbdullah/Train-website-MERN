const express = require("express");
const {
  getAllTrains,
  createTrains,
  getSingleTrain,
  deleteTrain,
  updateTrain,
  getAdminTrains,
} = require("../controllers/trainControllers");
const {
  isAuthenticatedUser,
  authRoles,
} = require("../middleware/AuthMiddleware");
const router = express.Router();

router.get("/trains", getAllTrains);
router.get(
  "/admin/trains",
  isAuthenticatedUser,
  authRoles("admin"),
  getAdminTrains
);
router.post(
  "/trains/new",
  isAuthenticatedUser,
  authRoles("admin"),
  createTrains
);
router.get("/trains/:id", getSingleTrain);
router.delete(
  "/train/:id",
  isAuthenticatedUser,
  authRoles("admin"),
  deleteTrain
);
router.put("/train/:id", isAuthenticatedUser, authRoles("admin"), updateTrain);

module.exports = router;

// ,isAuthenticatedUser,authRoles("admin")
