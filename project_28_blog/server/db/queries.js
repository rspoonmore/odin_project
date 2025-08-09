const pool = require("./pool");

/*
Posts (All)
    - Read (Get)
Posts (by ID)
    - Create (Post)
    - Read (Get)
    - Update (Post)
    - Delete (Post)
Users (by ID)
    - Create (Post)
    - Read (Get)
    - Update (Post)
Users (by email)
    - Read (Get)
Likes (by postid)

*/

async function postsAllRead() {
    const { rows } = await pool.query(`
        SELECT p.postid
            , p.userid
            , p.title
            , p.text
            , TO_CHAR(p.createdate, 'YYYY/MM/DD') as createdate
            , u.firstName
            , u.lastName
            , u.email
            , count(distinct l.userid) as likes
        FROM posts as p
        join users as u
            on p.userid = u.userid
        LEFT JOIN likes as l
            on p.postid = l.postid
        GROUP BY 1, 2, 3, 4, 5, 6, 7, 8
        order by createDate desc
    ;`);
    return rows;
}

async function postCreate({userid, title, text, createDate}) {
    await pool.query(`INSERT INTO posts (userid, title, text, createDate) VALUES ($1, $2, $3, $4);`, [userid, title, text, createDate])
}

async function postRead({postid}) {
    const { rows } = await pool.query(`
        SELECT p.postid
            , p.userid
            , p.title
            , p.text
            , TO_CHAR(p.createdate, 'YYYY/MM/DD') as createdate
            , u.email
            , CAST(count(distinct l.userid) AS INT) as likes
        FROM posts as p
        LEFT JOIN users as u
            on p.userid = u.userid
        LEFT JOIN likes as l
            on p.postid = l.postid
        where p.postid = $1
        GROUP BY 1, 2, 3, 4, 5, 6;`, [postid]);
    return rows[0];
}

async function postUpdate({postid, userid, title, text, createDate}) {
    await pool.query(`
        UPDATE posts 
        SET userid = $1, 
            title = $2, 
            text = $3, 
            createDate = $4
        WHERE postid = $5;`, [userid, title, text, createDate, postid]);
}

async function postDelete({postid}) {
    await pool.query(`DELETE FROM posts where postid = $1;`, [postid]);
    await pool.query(`DELETE FROM likes where postid = $1;`, [postid]);
}

async function userCreate({email, firstName, lastName, admin, password}) {
    const checkQueryResults = await pool.query('SELECT * FROM users WHERE email = $1 limit 1;', [email.toLowerCase()])
    if(checkQueryResults.rows.length > 0) {
        return undefined
    }
    await pool.query(`INSERT INTO users (email, firstName, lastName, admin, password) VALUES ($1, $2, $3, $4, $5);`, [email.toLowerCase(), firstName, lastName, admin, password])
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1 limit 1;', [email.toLowerCase()]);
    return rows[0];
}

async function userRead(userid) {
    const { rows } = await pool.query('SELECT * FROM users WHERE userid = $1 limit 1;', [userid]);
    return rows.length == 0 ? undefined : rows[0];
}

async function userUpdate({userid, email, firstName, lastName, admin=false}) {
    const checkQueryResults = await pool.query('SELECT * FROM users WHERE userid = $1 limit 1;', [userid]);
    if(checkQueryResults.rows.length == 0) {
        return undefined
    }
    await pool.query (`
        UPDATE users
        SET email = $2,
            firstName = $3,
            lastName = $4,
            admin = $5
        WHERE userid = $1
    ;`, [userid, email.toLowerCase(), firstName, lastName, admin]);
    const { rows } = await pool.query('SELECT * FROM users WHERE userid = $1 limit 1;', [userid]);
    return rows[0];
}

async function userLogin(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    return rows[0];
}

async function userAllRead() {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY userid;')
    return rows;
}

async function userDelete(userid) {
    await pool.query('DELETE FROM users WHERE userid = $1;', [userid]);
    await pool.query('DELETE FROM posts WHERE userid = $1;', [userid]);
    await pool.query('DELETE FROM likes WHERE userid = $1;', [userid]);
}

async function likedByUser({postid, userid}) {
    const {rows} = await pool.query(`
        SELECT MAX(case when userid = $2 then 1 else 0 end) = 1 as likedbyuser
        FROM likes
        WHERE postid = $1 
    ;`, [Number(postid), Number(userid)])
    if (!rows) {return false}
    if (rows.length == 0) {return false}
    return rows[0].likedbyuser;
}

async function likePost({postid, userid, createDate = new Date()}) {
    await pool.query(`INSERT INTO likes (userid, postid, createDate) VALUES ($1, $2, $3);`, [userid, postid, createDate]);
}

async function unlikePost({postid, userid}) {
    await pool.query(`DELETE FROM likes WHERE userid = $1 and postid = $2;`, [userid, postid]);
}


module.exports = {
  postsAllRead,
  postCreate,
  postRead,
  postUpdate,
  postDelete,
  likedByUser,
  likePost,
  unlikePost,
  userCreate,
  userRead,
  userUpdate,
  userLogin,
  userDelete,
  userAllRead
}

