const express = require("express");
const userUtilities = require("../../utilities/userUtilities");
const merchantUtilities = require("../../utilities/merchantUtilities");
const authRoutes = express.Router();
const authMiddleware = require("../../middleware/auth");

authRoutes.post("/create-user", async function (request, response) {
  const { email, password } = request.body;
  let success = false;
  try {
    success = await userUtilities.createUser(email, password);
  } catch (error) {
    console.error(error);
  }
  response.status(200).send({
    success: success,
  });
});

authRoutes.post("/sign-in", async function (request, response) {
  const { email, password } = request.body;
  var result = await userUtilities.signIn(email, password, response);
  response.status(200).send({
    success: result,
  });
});

module.exports = authRoutes;
