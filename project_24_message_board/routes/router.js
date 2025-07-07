const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('form')
});

router.post('/', (req, res) => {
    messages.push({
        text: req.body.message,
        user: req.body.user,
        added: new Date()
    })

    res.redirect('/')
})


module.exports = router;

