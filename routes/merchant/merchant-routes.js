const express = require("express");
const merchantUtilities = require("../../utilities/merchantUtilities");
const authRoutes = express.Router();
const authMiddleware = require("../../middleware/auth");
const constants = require("../../utilities/constants");
const httpUtilities = require("../../utilities/httpUtilities");

authRoutes.post(
  "/create-merchant",
  authMiddleware,
  async function (request, response) {
    const { merchantName } = request.body;
    const userInformation = httpUtilities.getUserInfoFromAuthorizationHeader(
      request.headers.authorization
    );

    var result = await merchantUtilities.createMerchant(
      userInformation.secureId,
      merchantName
    );
    response.status(200).send({
      success: result.success,
      privateKey: result.privateKey,
      merchantName: result.merchantName,
    });
  }
);

authRoutes.get(
  "/get-all-merchants",
  authMiddleware,
  async function (request, response) {
    const userInformation = httpUtilities.getUserInfoFromAuthorizationHeader(
      request.headers.authorization
    );

    var result = await merchantUtilities.getAllMerchantsBySecureId(
      userInformation.secureId
    );
    response.status(200).send({
      success: result.success,
      merchants: result.merchants,
    });
  }
);

authRoutes.get(
  "/delete-merchant",
  authMiddleware,
  async function (request, response) {
    const userInformation = httpUtilities.getUserInfoFromAuthorizationHeader(
      request.headers.authorization
    );
    const { merchantId } = request.body;
    var result = await merchantUtilities.deleteMerchantBySecureId(
      userInformation.secureId,
      merchantId
    );
    response.status(200).send({
      success: result.success,
    });
  }
);

authRoutes;

module.exports = authRoutes;
