const bcrypt = require('bcrypt');
var crypto = require('crypto');

const hashPasswordAsync = async (password) => {
    let hash = await bcrypt.hash(password, 10);
    return hash;
}

const createSecureId = () => {
    var token = crypto.randomBytes(40).toString('hex');
    return token;
}

const verifyPassword = async (password, hash) => {
    var same = await bcrypt.compare(password, hash);
    return same;
}

module.exports = {
    hashPasswordAsync,
    createSecureId,
    verifyPassword
}