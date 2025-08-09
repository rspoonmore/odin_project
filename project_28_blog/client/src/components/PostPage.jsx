import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { server } from '../public_fields'
import { setCurrentUserIfCookie } from "../cookies/CookieHandler";
import TopBar from "./partials/TopBar";
import OutcomeBanner from "./partials/OutcomeBanner";
import "../styles/PostPage.css"

const PostPage = () => {
    const [post, setPost] = useState(null);
    const [liked, setLiked] = useState(false);
    const [outcome, setOutcome] = useState(null);
    const {postid} = useParams();
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const loadPost = () => {
        console.log('Loading Post')
        if(!postid) {return console.log('No PostID in params')}
        fetch(`${server}/posts/${postid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                if(json.success && json.post) {
                    setPost(json.post)
                    if(json.post.likedbyrequestor) {
                        setLiked(true);
                    }
                    else {
                        setLiked(false);
                    }
                }
                })
            .catch(err => console.log(err))
    }

    const deletButton = () => {
        if (!post || !post.userid) { return <></> }
        if (!currentUser) { return <></> }
        if (!currentUser.admin && currentUser.userid !== post.userid) { return <></> }
        return <button className='btn' onClick={deletePressed}>Delete</button>
    }

    const deletePressed = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            console.log('Deleting Post')
            fetch(`${server}/posts/${postid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
                if(res && res.message) {
                    setOutcome(res);
                    if(res.success) {
                        setPost(null);
                        setLiked(false);
                    }
                }
            })
            .catch(error => {console.log(error)})
        }
    }

    const loadScreen = () => {
        setCurrentUserIfCookie(setCurrentUser);
        loadPost();
    }

    useEffect(loadScreen, []) 

    const likePost = () => {
        let likePostCall = 'unlike';
        // Create or Delete like
        let likeAmount = 0;
        if(liked) {
            likeAmount = -1;
        }
        else {
            likeAmount = 1;
            likePostCall = 'like';
        }

        // Send like or unlike to server
        fetch(`${server}/posts/${postid}/${likePostCall}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).catch(error => {console.log(error)})

        // Change post like amount locally
        setPost(prev => ({
            ...prev,
            likes: prev['likes'] + likeAmount
        }))

        // Change Like state
        setLiked(prev => {return !prev})
    }

    const postView = () => {
        if(!post) {return <></>}
        return (
            <div id='post-container'>
                <span id='post-title'>{post.title}</span>
                <div id='post-details'>
                    <span>Author: {post.email}</span>
                    <span>Create Date: {post.createdate}</span>
                    {deletButton()}
                </div>
                <div id='post-text'>{post.text}</div>
                <span id='post-likes'>
                    <button className='btn' onClick={likePost}>{liked ? 'Liked' : 'Like'}</button>
                    <span>{post.likes} like{post.likes === 1 ? '' : 's'}</span>
                </span>
            </div>
        )
    }

    return (
        <>
            <TopBar></TopBar>
            <OutcomeBanner outcome={outcome}></OutcomeBanner>
            {postView()}
        </>
    )
}

export default PostPage