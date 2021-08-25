const getUserInfoFromAuthorizationHeader = (authorizationHeader) => {
  let authorizationHeaderSplit = authorizationHeader.split(" ");
  let secureId = null;
  let username = null;
  if (validateAuthorizationHeaderSplit(authorizationHeaderSplit)) {
    secureId = authorizationHeaderSplit[1];
    username = authorizationHeaderSplit[2];
    return {
      secureId: secureId,
      username: username,
    };
  } else return null;
};

const validateAuthorizationHeaderSplit = (authorizationHeaderSplit) => {
  if (
    authorizationHeaderSplit[0] === "Bearer" &&
    authorizationHeaderSplit.length === 3
  ) {
    return true;
  }
  return false;
};

module.exports = {
  getUserInfoFromAuthorizationHeader,
};
