const express = require("express");
const router = express.Router();

const {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  addParticipantsToTrip,
  accesCode,
  addParticipantToTeam,
  getParticipants,
  updateParticipantScore,
  calculateTeamScores
} = require("../controllers/TripController");

// Route for creating a new trip
router.post("/trips", createTrip);

// Route for getting all trips
router.get("/trips", getAllTrips);

// Route for getting a specific trip by ID
router.get("/:id", getTripById);

// Route for updating a specific trip
router.put("/update_trip/:id", updateTrip);

// Route for deleting a specific trip
router.delete("/delete_trip/:id", deleteTrip);

// Route for adding participants to a trip
router.post("/:id/add_participants", addParticipantsToTrip);

// Route for getting a trip with Acces Code
router.get("/trip/:accessCode", accesCode);

router.post("/add-participant", addParticipantToTeam);

router.post('/update-participant', updateParticipantScore);

router.post('/get-participants',getParticipants);

router.post('/calculate-team-scores/:tripId', calculateTeamScores);

module.exports = router;
