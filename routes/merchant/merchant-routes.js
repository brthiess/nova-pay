const express = require("express");
const merchantUtilities = require("../../utilities/merchantUtilities");
const authRoutes = express.Router();
const authMiddleware = require("../../middleware/auth");
const constants = require("../../utilities/constants");

authRoutes.post(
  "/create-merchant",
  authMiddleware,
  async function (request, response) {
    const { merchantName } = request.body;
    const secureId = req.cookies[constants.secureId];
    var result = await merchantUtilities.createMerchant(secureId, merchantName);
    response.status(200).send({
      success: result.success,
      privateKey: result.privateKey,
    });
  }
);

module.exports = authRoutes;
