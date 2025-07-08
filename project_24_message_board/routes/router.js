const { Router } = require('express');
const { getMessageByID } = require('../controllers/messageController');

const messageRouter = Router();

messageRouter.get('/', (req, res) => {
    res.send('Blank Message Page')
})

messageRouter.get('/:messageID', (req, res) => {
    getMessageByID(req, res)
});

module.exports = messageRouter;

