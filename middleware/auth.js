const constants = require("../utilities/constants");
const userUtilities = require("../utilities/userUtilities")

module.exports = (req, res, next) => {
  try {
    var secureId = req.cookies[constants.secureId];
    var username = req.cookies[constants.username];
    if (userUtilities.isLoggedIn(secureId, username)){
      console.log("Logged in");
    }
    else {
      console.log("NOT LOGGED IN");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};