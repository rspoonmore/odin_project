const db = require('../db/queries');
const jwt = require('jsonwebtoken');
const authenticator = require('../passport/authenticator.js');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// const strategy = require('../passport/jwtStrategy.js')

// passport.use('jwt', strategy);

async function postsGetAll(req, res) {
    const posts = await db.postsAllRead();
    if(!posts) {
        return res.json({
            success: true,
            message: 'There were no posts found',
            posts: null
        })
    }
    return res.json({
        success: true,
        message: 'Posts found',
        posts: posts
    })
}

async function postsGet(req, res) {
    try {
        const params = req.params;
        const postid = Number(params.postid);
        const existingPost = await db.postRead({postid: postid});
        // Does post exist
        if(!existingPost) {
            return res.json({
                success: false,
                message: `Post with postid ${postid} does not exist`,
                postid: postid
            });
        }
        // Add whether requesting user has liked post
        let userHasLiked = false;
        const cookieSearchJson = authenticator.getUserIDFromCookie(req);
        if (cookieSearchJson.success && cookieSearchJson.userid) {
            const requestingUser = await db.userRead(cookieSearchJson.userid);
            if(requestingUser) {
                userHasLiked = await db.likedByUser({postid: postid, userid: Number(requestingUser.userid)});
            }
        }
        existingPost['likedbyrequestor'] = userHasLiked;
        // Return post
        res.json({
            success: true,
            message: 'Post found!',
            post: existingPost
        })
    } catch (error) {
        console.log(error)
    }
}

async function postsLikeByUser(req, res) {
    try {
        const params = req.params;
        const postid = Number(params.postid);
        // Read requesting User
        const cookieSearchJson = authenticator.getUserIDFromCookie(req);
        if(!cookieSearchJson || !cookieSearchJson.success || !cookieSearchJson.userid) {
            return res.json({
                success: false,
                message: 'The requesting user was not found'
            })
        }
        // Like post
        await db.likePost({postid: Number(postid), userid: Number(cookieSearchJson.userid)})
        // Return success
        res.json({
            success: true,
            message: 'Post liked!'
        })
    } catch (error) {
        console.log(error)
    }
}

async function postsUnlikeByUser(req, res) {
    try {
        const params = req.params;
        const postid = Number(params.postid);
        // Read requesting User
        const cookieSearchJson = authenticator.getUserIDFromCookie(req);
        if(!cookieSearchJson || !cookieSearchJson.success || !cookieSearchJson.userid) {
            return res.json({
                success: false,
                message: 'The requesting user was not found'
            })
        }
        // Unlike post
        await db.unlikePost({postid: Number(postid), userid: Number(cookieSearchJson.userid)})
        // Return success
        res.json({
            success: true,
            message: 'Post unliked!'
        })
    } catch (error) {
        console.log(error)
    }
}

async function postsPut(req, res) {
    res.json({
        action: 'put',
        body: req.body
    })
}

async function postsPost(req, res) {
    try {
        const { title, text } = req.body;
        const cookieSearchJson = authenticator.getUserIDFromCookie(req);
        if (!cookieSearchJson.success || !cookieSearchJson.userid) {
            return res.json(cookieSearchJson)
        }
        const userid = cookieSearchJson.userid;
        console.log(userid);
        // Post new Blog Post
        await db.postCreate({userid, title, text, createDate: new Date()})
        return res.json({
            success: true,
            message: 'Post Created!'
        })
    } catch (error) {
        console.log(error)
    }
}

async function postsDelete(req, res) {
    const {postid} = req.params;
    if (!postid) {
        return res.json({
            success: false,
            message: 'No postid found in request params'
        })
    }
    const post = await db.postRead({postid: Number(postid)});
    if (!post) {
        return res.json({
            success: false,
            message: `No post with postid ${postid} found`
        })
    }
    // Is the requesting user the same or an admin
    let reqAllowed = false;
    const cookieSearchJson = authenticator.getUserIDFromCookie(req);
    if (cookieSearchJson.success && cookieSearchJson.userid) {
        const requestingUser = await db.userRead(cookieSearchJson.userid);
        if(requestingUser && requestingUser.admin) {
            reqAllowed = true;
        }
        else if(requestingUser && requestingUser.userid == post.userid) {
            reqAllowed = true;
        }
    }
    if(!reqAllowed) {
        return res.json({
            success: false,
            message: 'The user requesting the delete is not an admin and does not match the userid of the post being deleted.'
        })
    }
    try {
        await db.postDelete({postid});
        return res.json({
            success: true,
            message: `Post ${postid} deleted`
        })
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    postsGetAll,
    postsGet,
    postsPut,
    postsPost,
    postsDelete,
    postsLikeByUser,
    postsUnlikeByUser
}

