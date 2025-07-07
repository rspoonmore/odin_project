const messages = [
    {id: 1, text: "Hello"},
    {id: 2, text: "This is a message"},
    {id: 3, text: "Hope this works for you!"},
];

async function getMessageByID(messageID) {
    return messages.find(message => message.id === messageID);
};

module.exports = {getMessageByID}