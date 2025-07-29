const jwt = require('jsonwebtoken');

function getUserIDFromCookie(req) {
    // Read JWT cookie from header
    const cookies = req.headers.cookie;
    if(!cookies) {
        return {
            success: false,
            message: 'No cookies were found in the header'
        }
    }
    let token = undefined;
    if(typeof cookies == 'string') {
        token = cookies.slice(4)
    } else if('jwt' in cookies) {
        token = cookies['jwt']
    } else {
        return {
            success: false,
            message: 'No JWT cookie was found'
        }
    }
    // const { jwt: token } = req.headers.cookie;
    const decodedToken = jwt.decode(token);
    // Get UserID from cookie
    const { userid } = decodedToken;
    if(!userid) {
        return {
            success: false,
            message: 'User was not found from the cookie of the request to create post'
        }
    }
    return {
        success: true,
        message: 'User found',
        userid: userid
    }
}

module.exports = {getUserIDFromCookie}
