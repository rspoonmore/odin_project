const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_CODE, (err, authData) => {
        if(err) {
            res.sendStatus('403');
        } else {
            res.json({
                message: 'Post created',
                authData: authData,
                
            });
        }
    });
    
});

app.post('/api/login', (req, res) => {
    // This is where you would send the login info to database.
    // Once the login was authenticated, the user would be returned.
    const user = {
        id: 1,
        username: 'Ryan',
        email: 'ryan@test.com'
    };

    jwt.sign({user: user}, process.env.SECRET_CODE, (err, token) => {
        res.json({
            token: token
        });
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof(bearerHeader) !== 'undefined') {
        // Split at the space and get token
        const bearerToken = bearerHeader.split(' ')[1];
        // Set the token
        req.token = bearerToken;
        // call next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(process.env.PORT || 5000, () => {console.log(`Listening on port ${process.env.PORT || 5000}`)});
