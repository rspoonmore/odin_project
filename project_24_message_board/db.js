const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

async function getMessageByUser(user) {
    return messages.find(message => message.user === user);
};

module.exports = {getMessageByUser}