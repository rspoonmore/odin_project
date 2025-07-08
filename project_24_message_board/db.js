class Messages {
  constructor() {
    this.messages = [
      {
        id: 1,
        text: "Hi there!",
        user: "Amando",
        added: new Date()
      },
      {
        id: 2,
        text: "Hello World!",
        user: "Charles",
        added: new Date()
      }
    ]

    this.nextID = 3;
  }

  addMessage(user, text) {
    const newMessage = {
      id: this.nextID,
      text: text,
      user: user,
      added: new Date()
    }

    this.nextID += 1
    this.messages.push(newMessage);
  }

  async getMessageByID(id) {
    return this.messages.find(message => message.id === Number(id))
  }
}

module.exports = {Messages}