const express = require("express");
const authRoutes = require("./auth/auth-routes");
const apiRoutesV1 = require("./api/api-routes-v1");

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/api/v1", apiRoutesV1);

routes.get("/", (req, res) => {
  res.send("Nova Pay Website");
});

module.exports = routes;
