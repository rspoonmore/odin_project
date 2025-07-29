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
        FROM posts as p
        join users as u
            on p.userid = u.userid
        order by createDate desc
    ;`);
    return rows;
}

async function postCreate({userid, title, text, createDate}) {
    await pool.query(`INSERT INTO posts (userid, title, text, createDate) VALUES ($1, $2, $3, $4);`, [userid, title, text, createDate])
}

async function postRead({postid}) {
    const { rows } = await pool.query("SELECT * FROM posts where postid = $1;", [postid]);
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
}

async function userCreate({email, firstName, lastName, admin, password}) {
    await pool.query(`INSERT INTO users (email, firstName, lastName, admin, password) VALUES ($1, $2, $3, $4, $5, $6);`, [email.toLowerCase(), firstName, lastName, admin, password])
}

async function userRead({userid}) {
    const { rows } = await pool.query('SELECT * FROM users WHERE userid = $1;', [userid]);
    return rows[0];
}

async function userUpdate({userid, email, firstName, lastName, admin=false, password}) {
    await pool.query (`
        UPDATE users
        SET email = $2,
            firstName = $3,
            lastName = $4,
            admin = $5,
            password = $6
        WHERE userid = $1
    ;`, [userid, email.toLowerCase(), firstName, lastName, admin, password])
}

async function userLogin(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    return rows[0];
}


module.exports = {
  postsAllRead,
  postCreate,
  postRead,
  postUpdate,
  postDelete,
  userCreate,
  userRead,
  userUpdate,
  userLogin
}

