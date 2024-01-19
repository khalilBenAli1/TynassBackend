const { User } = require("../models/User");
const { Trip } = require("../models/Trip");


module.exports = {
    createTrip: async (req, res) => {
        try {
            const userId = req.body.userId; 
            const participants = req.body.participants; 
    
            // Create and save the new trip
            const newTrip = new Trip(req.body);
            const savedTrip = await newTrip.save();
    
            // Add trip to the user's 'adminTrips' who created the trip
            await User.findByIdAndUpdate(userId, { $push: { adminTrips: savedTrip._id } });
    
            // Optionally, add trip to 'trips' for each participant
            if (participants && participants.length) {
                await User.updateMany(
                    { _id: { $in: participants } },
                    { $push: { trips: savedTrip._id } }
                );
            }
    
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
                res.status(404).json({ message: 'Trip not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a trip
    updateTrip: async (req, res) => {
        try {
            const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
                res.status(200).json({ message: 'Trip successfully deleted' });
            } else {
                res.status(404).json({ message: 'Trip not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
