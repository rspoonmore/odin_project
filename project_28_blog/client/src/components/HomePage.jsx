import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext";
import '../styles/HomePage.css';
import { server } from '../public_fields'
import TopBar from "./partials/TopBar";
import UserView from "./partials/UserView";
import PostView from "./partials/PostView";
import { setCurrentUserIfCookie } from "../cookies/CookieHandler";

const HomePage = () => {
    const [users, setUsers] = useState(null);
    const [posts, setPosts] = useState(null);
    const [showUsers, setShowUsers] = useState(false);
    const [showPosts, setShowPosts] = useState(true);
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const loadUsers = () => {
        console.log('Loading Users')
        fetch(`${server}/users`)
            .then(res => res.json())
            .then(json => {
                if(json.success && json.users) {
                    setUsers(json.users)
                }
                })
            .catch(err => console.log(err))
    }

    const loadPosts = () => {
        console.log('Loading Posts')
        fetch(`${server}/posts`)
            .then(res => res.json())
            .then(json => {
                if(json.success && json.posts) {
                    setPosts(json.posts)
                }
                })
            .catch(err => console.log(err))
    }

    const loadScreen = () => {
        setCurrentUserIfCookie(setCurrentUser)
        loadUsers()
        loadPosts()
    }

    useEffect(loadScreen, []) 

    const showUsersButton = () => {
        const onClick = () => {
            setShowUsers(prev => {return !prev})
        }

        return <button className='btn large-btn' onClick={onClick}>{showUsers ? 'Hide' : 'Show'} Users</button>
    }

    const showPostsButton = () => {
        const onClick = () => {
            setShowPosts(prev => {return !prev})
        }

        return <button className='btn large-btn' onClick={onClick}>{showPosts ? 'Hide' : 'Show'} Posts</button>
    }

    const dynamicUserView = () => {
        if(!showUsers) return <></>
        return <UserView currentUser={currentUser} users={users} onDelete={loadUsers}></UserView>
    }

    const dynamicPostView = () => {
        if(!showPosts) return <></>
        return <PostView posts={posts}></PostView>
    }

    return (
        <>
            <TopBar></TopBar>
            <h1>Welcome to the Home Page{currentUser ? ` ${currentUser.firstname}!` : ''}</h1>
            <div className='home-view-buttons'>
                {showUsersButton()}
                {showPostsButton()}
            </div>
            {dynamicUserView()}
            {dynamicPostView()}
        </>
    )


}

export default HomePage