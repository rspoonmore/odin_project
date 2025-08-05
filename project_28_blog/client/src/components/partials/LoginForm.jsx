import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/partials/LoginForm.css';
import { server } from '../../public_fields';


const LoginForm = ({setShowLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [outcome, setOutcome] = useState(null)
    const { setCurrentUser } = useContext(AuthContext);

    const login = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data['email'] = email;
        data['password'] = password;
        try {
            await fetch(`${server}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    if(res.success) {
                        setEmail('');
                        setPassword('');
                        setOutcome(res);
                        setCurrentUser(res.user);
                        setShowLogin(false);
                    }
                    else {
                        setOutcome(res);
                    }
                })
        } catch(error) {
            console.log(error)
        }
    }

    function updateInput(inputType, e) {
        if(inputType === 'email') {
            setEmail(e.target.value);
        }
        if(inputType === 'password') {
            setPassword(e.target.value);
        }
    }

    function outcomeBanner() {
        if(!outcome) {return <></>}
        if(!outcome.message) {return <></>}
        return (
            <div className = {outcome.success ? 'outcome-banner outcome-banner-success' : 'outcome-banner outcome-banner-fail'}>
                {outcome.message}
            </div>
        )
    }

    function emailPasswordForm() {
        return (
            <form className='form-login' onSubmit={login}>
                {/* <label htmlFor='email'>Email</label> */}
                <input 
                    id='email' 
                    name='email' 
                    type='email' 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {updateInput('email', e)}}
                required/>
                {/* <label htmlFor='password'>Password</label> */}
                <input 
                    id='password' 
                    name='password' 
                    type='password' 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {updateInput('password', e)}}
                required/>
                <button type='submit'>Log In</button>
            </form>
        )
    }

    return (
        <div>
            {outcomeBanner()}
            {emailPasswordForm()}
        </div>
    )

}

export default LoginForm
