const express = require("express");
const usersRouter = new express.Router();

const users = require("../Controllers/users.controller");

// Create a new User ** SIGNUP **
usersRouter.post("/users", users.create); //post => controller.create

// Retrieve all users
usersRouter.get("/users", users.findAll); //get => controller.findAll

// Retrieve a single User - ** LOGIN **
usersRouter.post("/users/login",  users.findOne); //controller.method

// Update a User with userId
usersRouter.patch("/users/:userId", users.update); //controller.method

// Delete a User with userId
usersRouter.delete("/users/:userId", users.deleteById); //delete => controller.delete

// Create a new User
usersRouter.delete("/users", users.deleteAll); //delete => controller.deleteAll

module.exports = usersRouter;
