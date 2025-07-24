const CryptoJS = require("crypto-js");
require('dotenv').config();

function encryptUserID(userid) {
    return CryptoJS.AES.encrypt(String(userid), process.env.sessionSecret).toString();
}

function decryptUserID(encryptedUserID) {
    const bytes = CryptoJS.AES.decrypt(encryptedUserID, process.env.sessionSecret);
    return Number(bytes.toString(CryptoJS.enc.Utf8));
}

module.exports = {
    encryptUserID,
    decryptUserID
}