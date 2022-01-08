const User = require("../Models/User.model");
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send("Content can not be empty");
  }
  console.log(req.body);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
  });

  User.create(newUser, async (err, resData) => {
    try {
      if (err)
        res.status(500).send({ message: err.message || "Some error message" });
      else {
        await newUser.generateAuthToken();
        res.status(201).send(resData);
      }
    } catch (error) {
      res
        .status(400)
        .send("err", { message: error.message || "Some error message" });
    }
  });
};

exports.findAll = (req, res) => {
  User.find({}, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

// Login
exports.findOne = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(404).send({ message: "Username didn't found!" });
    // throw {message: "Unable to login"};
  }
  const isMatch = await bcrypt.compare(password.toString(), user.password);
  if (!isMatch) {
    return res.status(404).send({ message: "Wrong password!" });
    // throw { message: "Unable to login" };
  }
  console.log(user);
  res.status(200).send(user);
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  console.log(req.body.favorites);

  // Find the user
  // const user = await User.findById(req.params.userId);
  // console.log(user);

  const updatedValues = req.body;

  // Update him and push to his favorite array the new array
  User.findByIdAndUpdate(req.params.userId, updatedValues, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving User with id " + req.params.userId,
      });
    } else res.status(200).send(data);
  });
};

exports.deleteAll = (req, res) => {
  User.deleteMany({}, (err, data) => {
    if (err)
      res.status(400).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};

exports.deleteById = (req, res) => {
  const id = req.params.userId;
  User.findOneAndDelete(id, (err, data) => {
    if (err)
      res.status(400).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    else res.send({ message: `User deleted successfully!` });
  });
};
