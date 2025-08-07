import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { server } from '../public_fields'
import { setCurrentUserIfCookie } from "../cookies/CookieHandler";
import TopBar from "./partials/TopBar";
import "../styles/PostPage.css"

const PostPage = () => {
    const [post, setPost] = useState(null);
    const [liked, setLiked] = useState(false);
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const loadPost = () => {
        console.log('Loading Post')

        const dummyPostData = {
            'postid': 1,
            'title': 'Hello World',
            'text': 'This is a dummy post',
            'createdate': '2025-08-07',
            'email': 'ryan@test.com',
            'likes': 3
        }
        setPost(dummyPostData)
    }

    const loadLike = () => {
        console.log('Loading Like')

        setLiked(true);
    }

    const loadScreen = () => {
        setCurrentUserIfCookie(setCurrentUser);
        loadPost();
        loadLike();
    }

    useEffect(loadScreen, []) 

    const likePost = () => {
        console.log('Like/Unlike Button hit')

        const dummyLikeFunc = () => {
            // Create or Delete like
            let likeAmount = 0;
            if(liked) {
                likeAmount = -1;
            }
            else {
                likeAmount = 1;
            }

            // Change post like amount locally
            setPost(prev => ({
                ...prev,
                likes: prev['likes'] + likeAmount
            }))

            // Change Like state
            setLiked(prev => {return !prev})
        }

        dummyLikeFunc()
    }

    const postView = () => {
        if(!post) {return <h3>Loading...</h3>}
        return (
            <div id='post-container'>
                <span id='post-title'>{post.title}</span>
                <div id='post-details'>
                    <span>Author: {post.email}</span>
                    <span>Create Date: {post.createdate}</span>
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
            {postView()}
        </>
    )
}

export default PostPage