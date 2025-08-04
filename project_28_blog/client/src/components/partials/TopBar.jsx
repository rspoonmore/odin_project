import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import '../../styles/partials/TopBar.css';
import { server } from '../../public_fields'
import LoginForm from './LoginForm';

const TopBar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const { currentUser, setCurrentUser} = useContext(AuthContext);

    function loginWindow() {
        if(showLogin) {
            return <LoginForm setShowLogin={setShowLogin}></LoginForm>
        }
    }

    async function logout() {
        if(window.confirm('Are you sure you want to log out?')) {
            await fetch(`${server}/users/logout`, {method: 'POST'})
            .then(() => {
                setCurrentUser(null);
            })       
        }
    }

    function buttonClick() {
        if(!currentUser) {
            setShowLogin(true);
        }
        else {
            logout()
        }
    }

    return (
        <div className='top-bar'>
            <div id='top-bar-link-div'>
                <Link to='/'>Home</Link>
                <Link to='/register'>Register</Link>
            </div>
            <div id='top-bar-button-div'>
                <button 
                    className={showLogin ? 'hidden' : ''} 
                    onClick={buttonClick}>{currentUser ? 'Log Out' : 'Log In'}
                </button>
                {loginWindow()}
            </div>
        </div>
    )
}

export default TopBar