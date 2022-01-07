const Flight = require("../Models/Flight.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send("Content can not be empty");
  }
  console.log(req.body);

  const newFlight = new Flight({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    pictures: req.body.pictures,
    date: req.body.date,
  });

  Flight.create(newFlight, (err, resData) => {
    console.log(newFlight);

    if (err)
      res.status(500).send({ message: err.message || "Some error message" });
    else res.status(201).send(resData);
  });
};

exports.findAll = (req, res) => {
  Flight.find((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Flight.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Flight.findById(req.params.flightId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flight with id ${req.params.flightId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flight with id " + req.params.flightId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const id = req.params.flightId;
  console.log(req.body);
  console.log(id);
  const updatedValues = req.body;

  Flight.findByIdAndUpdate(id, updatedValues, (err, data) => {
    try {
      if (err)
        res.status(404).send({
          message: `Not found Flight with id ${req.params.flightId}.`,
        });
      else res.status(200).send("Flight Updated!");
    } catch (error) {
      res.status(500).send({
        message: "Error retrieving Flight with id " + req.params.flightId,
      });
    }
  });
};

exports.deleteById = (req, res) => {
  const id = req.params.flightId;
  Flight.findByIdAndRemove(id, (err, data) => {
    if (err)
      res.status(400).send({
        message:
          err.message || "Some error occurred while removing all Flights.",
      });
    else res.send({ message: `Flight deleted successfully!` });
  });
};
