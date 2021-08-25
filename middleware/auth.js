const constants = require("../utilities/constants");
const userUtilities = require("../utilities/userUtilities");
const httpUtilities = require("../utilities/httpUtilities");

module.exports = async (req, res, next) => {
  try {
    let userInformation = httpUtilities.getUserInfoFromAuthorizationHeader(
      req.headers.authorization
    );
    if (userInformation) {
      let isLoggedIn = await userUtilities.isLoggedIn(
        userInformation.secureId,
        userInformation.username
      );
      if (isLoggedIn) {
        next();
        return;
      }
    }
    throw "Invalid Request";
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: new Error("Invalid Request"),
    });
  }
};
