const { Router } = require('express');
const { getMessageByID } = require('../controllers/messageController');

const messageRouter = Router();

messageRouter.get('/', (req, res) => res.send('All Messages'));
messageRouter.get('/:user', (req, res) => {
    const { user } = req.params;
    console.log('Query:', req.query);
    res.send(`User: ${user}`);
});

messageRouter.get('/:user/:messageID', (req, res) => {
    console.log('Params:', req.params);
    console.log('Query:', req.query);
    getMessageByID(req, res)
});

module.exports = messageRouter;

