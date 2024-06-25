const { User } = require("../models/User");
const { Trip } = require("../models/Trip");

const mongoose=require("mongoose")
module.exports = {
  // Create A Trip
  createTrip: async (req, res) => {
    try {
    const userId = new mongoose.Types.ObjectId(req.body.userId)
      const newTrip = new Trip(req.body);
      await newTrip.generateQRCode();
      newTrip.qrCode.createdAt = new Date();
      const savedTrip = await newTrip.save();
      await User.findByIdAndUpdate(userId, {
        $push: { adminTrips: savedTrip._id },
      });
      

      res.status(201).json(savedTrip);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getAllTrips: async (req, res) => {
    try {
      const trips = await Trip.find();
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single trip by ID
  getTripById: async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      if (trip) {
        res.status(200).json(trip);
      } else {
        res.status(404).json({ message: "Trip not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a trip
  updateTrip: async (req, res) => {
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedTrip);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a trip
  deleteTrip: async (req, res) => {
    try {
      const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
      if (deletedTrip) {
        res.status(200).json({ message: "Trip successfully deleted" });
      } else {
        res.status(404).json({ message: "Trip not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Method to add participants to a trip
  addParticipantsToTrip: async (req, res) => {
    try {
      const { tripId, participants } = req.body;

      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      if (participants && participants.length) {
        await User.updateMany(
          { _id: { $in: participants } },
          { $push: { trips: tripId } }
        );
      }

      res
        .status(200)
        .json({ message: "Participants added to the trip successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // Method to get Access Code of a trip
  accesCode: async (req, res) => {
      try {
          const trip = await Trip.findOne({ accessCode: req.params.accessCode });
          if (!trip) {
              return res.status(404).send('Trip not found.');
          }
          res.json(trip);
      } catch (error) {
          res.status(500).send('Server error');
      }
  },
  addParticipantToTeam: async (req, res) => {
    const { tripId, participantId, teamName } = req.body;

    try {
      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).send('Trip not found');
      }


      trip.teams.forEach(team => {
        const index = team.participants.indexOf(participantId);
        if (index !== -1) {
          team.participants.splice(index, 1);
        }
      });

      const team = trip.teams.find(team => team.teamName === teamName);
      if (team) {
        team.participants.push(participantId);
      } else {
        return res.status(404).send('Team not found');
      }

      await trip.save();


      const io = req.app.get('io');

      io.emit('teamChange', { tripId, teams: trip.teams });

      res.status(200).send(`Participant added to team ${teamName}`);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
};
