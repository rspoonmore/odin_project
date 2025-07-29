const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

const allowedOrigins = ['http://localhost:3000']

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin)
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
})

app.get('/', (req, res) => {
    res.json({
        message: 'Homepage'
    });
});

app.use('/users', userRouter)
app.use('/posts', postRouter)

app.listen(process.env.PORT || 5000, () => {console.log(`Listening on port ${process.env.PORT || 5000}`)});
