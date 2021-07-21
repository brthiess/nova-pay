const express = require("express");
const cryptoUtilities = require("../../utilities/cryptoUtilities");
const chargeUtilities = require("../../utilities/chargeUtilities");
const apiRoutes = express.Router();

apiRoutes.get("/", function (request, response) {
  response.send("Nova Pay API V1");
});

apiRoutes.post("/charges", async function (request, response) {
  const { merchantId, currentDateTime, orderId, signature, amount } =
    request.body;

  var isVerified = await cryptoUtilities.verifySignature(
    merchantId,
    currentDateTime,
    orderId,
    signature
  );

  if (!isVerified) {
    response.status(403);
    return;
  }

  var result = await chargeUtilities.createCharge(merchantId, orderId, amount);

  response.status(200).send({
    success: result.success,
    orderInfo: result.orderInfo,
  });
});

module.exports = apiRoutes;
