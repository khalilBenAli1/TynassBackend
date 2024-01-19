const express = require("express");
const router = express.Router();

const {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  addParticipantsToTrip,
} = require("../controllers/TripController");

// Route for creating a new trip
router.post("/trips", createTrip);

// Route for getting all trips
router.get("/trips", getAllTrips);

// Route for getting a specific trip by ID
router.get("/trip/:id", getTripById);

// Route for updating a specific trip
router.put("/update_trip/:id", updateTrip);

// Route for deleting a specific trip
router.delete("/delete_trip/:id", deleteTrip);

// Route for adding participants to a trip
router.post("/trip/:id/add_participants", addParticipantsToTrip);

module.exports = router;
