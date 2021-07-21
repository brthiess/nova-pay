const crypto = require('./cryptoUtilities');

const createCharge = async (merchantId, orderId, amount) => {
    //Add charge to charge table
    
    //Create QR Code image that has public key + amount
    //Return public key, QR code image
}

module.exports = {
    createCharge
}