const crypto = require('./cryptoUtilities');
const db = require('../queries')

const createUser = async (request, response) => {
    const { email, password } = request.body;
    var hashedPassword = await crypto.hashPasswordAsync(password);
    var secureId = crypto.createSecureId();

    var results = await db.createUser(email, hashedPassword, secureId);
    response.status(200).send({
        "success": true
    });
}

const signIn = async (request, response) => {
    const { email, password } = request.body;

    var results = await db.findUserByEmail(email);

    let passwordIsCorrect = false;
    if (results && results.rows && results.rows.length > 0) {
        passwordIsCorrect = await crypto.verifyPassword(password, results.rows[0].hashed_password);
    }

    if (passwordIsCorrect) {
        response.cookie('secure_id', results.rows[0].secure_id, { maxAge: 900000, httpOnly: true });
    }

    response.status(200).send({
        "success": passwordIsCorrect
    });
}




module.exports = {
    createUser,
    signIn
}
