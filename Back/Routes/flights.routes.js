const express = require("express");
const flightsRouter = new express.Router();

const flights = require("../Controllers/filghts.controller");

// Create a new Flight
flightsRouter.post("/flights", flights.create); //post => controller.create

// Retrieve all flights
flightsRouter.get("/flights", flights.findAll); //get => controller.findAll

// Retrieve a single Flight with flightId
flightsRouter.get("/flights/:flightId", flights.findOne); //controller.method

// Update a Flight with flightId
flightsRouter.patch("/flights/:flightId", flights.update); //controller.method

// Delete a Flight with flightId
flightsRouter.delete("/flights/:flightId", flights.deleteById); //delete => controller.delete

module.exports = flightsRouter;
