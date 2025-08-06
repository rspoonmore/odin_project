import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext";
import '../styles/HomePage.css';
import { server } from '../public_fields'
import TopBar from "./partials/TopBar";
import UserView from "./partials/UserView";
import { clearCookiesIfNoCurrentUser } from "../cookies/CookieHandler";

const HomePage = () => {
    const [users, setUsers] = useState(null);
    const [showUsers, setShowUsers] = useState(true);
    const { currentUser } = useContext(AuthContext);

    const loadUsers = () => {
        fetch(`${server}/users`)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    setUsers(json.users)
                }
                })
            .catch(err => console.log(err))
    }

    const loadScreen = () => {
        clearCookiesIfNoCurrentUser(currentUser)
        loadUsers()
    }

    useEffect(loadScreen, [currentUser]) 

    const showUsersButton = () => {
        const onClick = () => {
            setShowUsers(prev => {return !prev})
        }

        return <button className='btn' onClick={onClick}>{showUsers ? 'Hide' : 'Show'} Users</button>
    }

    const dynamicUserView = () => {
        if(!showUsers) return <></>
        return <UserView currentUser={currentUser} users={users} onDelete={loadUsers}></UserView>
    }

    return (
        <>
            <TopBar></TopBar>
            <h1>Welcome to the Home Page{currentUser ? ` ${currentUser.firstname}!` : ''}</h1>
            <div className='home-view-buttons'>
                {showUsersButton()}
            </div>
            {dynamicUserView()}
            {/* {UserView({currentUser, users, onDelete: loadUsers})} */}
        </>
    )


}

export default HomePage