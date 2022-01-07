const express = require("express");
const cors = require("cors");
require("./DB/mongoose.db");
const flightsRouter = require("./Routes/flights.routes");
const usersRouter = require("./Routes/users.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(flightsRouter);
app.use(usersRouter);

// For test
app.get("/", (req, res) => res.send("Hello World!"));

module.exports = app;
