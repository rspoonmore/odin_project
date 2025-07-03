const { Router } = require('express');

const messageRouter = Router();

messageRouter.get('/', (req, res) => res.send('All Messages'));
messageRouter.get('/:user', (req, res) => {
    const { user } = req.params;
    console.log('Query:', req.query);
    res.send(`User: ${user}`);
});

module.exports = messageRouter;

