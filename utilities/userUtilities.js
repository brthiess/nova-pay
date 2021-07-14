const crypto = require('./cryptoUtilities');
const db = require('../queries')

const createUser = async (email, password) => {
    var hashedPassword = await crypto.hashPasswordAsync(password);
    var secureId = crypto.createSecureId();

    return await db.createUser(email, hashedPassword, secureId);
}

const signIn = async (email, password, response) => {

    var results = await db.findUserByEmail(email);

    let passwordIsCorrect = false;
    if (results && results.rows && results.rows.length > 0) {
        passwordIsCorrect = await crypto.verifyPassword(password, results.rows[0].hashed_password);
    }

    if (passwordIsCorrect) {
        response.cookie('secure_id', results.rows[0].secure_id, { maxAge: 900000, httpOnly: true, secure: true});
    }

    return passwordIsCorrect;
}

const isLoggedIn = async (secureId) => {
    let isLoggedIn = false;
    try {
        var results = await db.findUserBySecureId(secureId);
        if (results && results.rows && results.rows.length > 0){
            isLoggedIn = true;
        }
    }
    catch(error){
        console.error(error);
    }
    return isLoggedIn;
}




module.exports = {
    createUser,
    signIn
}
