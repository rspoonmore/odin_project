const { Messages } = require('../db');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

const messageDB = new Messages();

function getMessages() {
    return messageDB.messages;
}

function addMessageFromForm(formData) {
    messageDB.addMessage(formData.user, formData.message)
}

async function getMessageByID(req, res) {
    const {messageID} = req.params;

    const message = await messageDB.getMessageByID(Number(messageID));

    if (!message) {
        throw new CustomNotFoundError(`MessageID ${messageID} not found`)
    }

    res.render('message-detail', {message: message});
};

module.exports = {getMessages, addMessageFromForm, getMessageByID}