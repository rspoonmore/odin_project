import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/partials/TopBar.css';
import { server } from '../../public_fields'
import LoginForm from '../LoginForm';

export default function TopBar({ userid=null, setUser= (user) => console.log(`setUser called for ${JSON.stringify(user)}`)}) {
    const [showLogin, setShowLogin] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(userid);

    function loginWindow() {
        if(showLogin) {
            const acceptLogin = (res) => {
                if (!res) {return};
                if (!res.userid) {return};
                setCurrentUserId(res.userid);
                setShowLogin(false);
                setUser(res);
            }

            return <LoginForm setUser={acceptLogin}></LoginForm>
        }
    }

    async function logout() {
        if(window.confirm('Are you sure you want to log out?')) {
            await fetch(`${server}/users/logout`, {method: 'POST'})
            .then(() => {
                setCurrentUserId(null);
                setUser(null);
            })       
        }
    }

    function buttonClick() {
        if(!currentUserId) {
            setShowLogin(true);
        }
        else {
            logout()
        }
    }

    return (
        <div className='top-bar'>
            <Link to='/'>Home</Link>
            <div id='top-bar-button-div'>
                <button 
                    className={showLogin ? 'hidden' : ''} 
                    onClick={buttonClick}>{currentUserId ? 'Log Out' : 'Log In'}
                </button>
                {loginWindow()}
            </div>
        </div>
    )
}