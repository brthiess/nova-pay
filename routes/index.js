const express = require("express");
const userRoutes = require("./user/user-routes");
const merchantRoutes = require("./merchant/merchant-routes");
const apiRoutesV1 = require("./api/api-routes-v1");

const routes = express.Router();

routes.use("/auth", userRoutes);
routes.use("/api/v1", apiRoutesV1);
routes.use("/merchant", merchantRoutes);

routes.get("/", (req, res) => {
  res.send("Nova Pay Website");
});

module.exports = routes;
