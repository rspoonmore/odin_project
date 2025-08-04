import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext";
import '../styles/HomePage.css';
import { server } from '../public_fields'
import TopBar from "./partials/TopBar";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [users, setUsers] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        console.log('Loading Users')
        fetch(`${server}/users`)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    setUsers(json.users)
                }
                })
            .catch(err => console.log(err))
    }, []) 

    function editButton(userid) {
        if(!currentUser) {return null}
        if(!currentUser.admin && currentUser.userid !== userid) {return null}
        return <Link to={`/users/:${userid}/update`}>Update</Link>
    } 

    function generateUsers() {
        if(!users) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div>
                <h3>Users:</h3>
                <ul>
                    {users.map(user => {
                        return (
                            <li key={user.userid}>
                                {user.email} {editButton(user.userid)}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }


    return (
        <>
            <TopBar></TopBar>
            <h1>Welcome to the Home Page{currentUser ? ` ${currentUser.firstname}!` : ''}</h1>
            {generateUsers()}
        </>
    )


}

export default HomePage