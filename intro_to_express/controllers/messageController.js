const db = require('../db');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

async function getMessageByID(req, res) {
    const {user = null, messageID} = req.params;

    const message = await db.getMessageByID(Number(messageID));

    if (!message) {
        throw new CustomNotFoundError(`MessageID ${messageID} not found`)
    }

    res.send(`${user ? 'User: ' + user + '<br>': ''}Message: ${message.text}`);
    
};

module.exports = {getMessageByID}