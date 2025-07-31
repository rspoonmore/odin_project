import { Component } from "react"
import '../styles/LoginForm.css';
import { server } from '../public_fields'

class LoginForm extends Component {
    constructor({setUser = () => console.log('define setUser')}) {
        super();
    
        this.setUser = setUser;

        this.state = {
            email: '',
            password: '',
            outcome: {}
        };
    };

    login = async (e) => {
        e.preventDefault();

        const data = new FormData()
        data['email'] = this.state.email;
        data['password'] = this.state.password;
        try {
            
            await fetch(`${server}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    if(res.success) {
                        this.setState(prev => ({
                            ...prev,
                            email: '',
                            password: ''
                        }))
                        this.setUser(res.user)
                    }
                    else {
                        this.setState(prev => ({
                            ...prev,
                            outcome: res
                        }))
                    }
                })
        } catch(error) {
            console.log(error)
        }
    }

    updateInput(inputType, e) {
        this.setState(prevState => {
            if(inputType === 'email') {
                return ({
                    ...prevState,
                    email: e.target.value
                })
            } else {
                return ({
                    ...prevState,
                    password: e.target.value
                })
            }
        })
    }

    outcomeBanner() {
        if(!this.state.outcome) {return <></>}
        if(!this.state.outcome.message) {return <></>}
        return (
            <div className = {this.state.outcome.success ? 'outcome-banner-success' : 'outcome-banner-fail'}>
                {this.state.outcome.message}
            </div>
        )
    }

    emailPasswordForm() {
        return (
            <form className='form-login' onSubmit={this.login}>
                <label htmlFor='email'>Email</label>
                <input 
                    id='email' 
                    name='email' 
                    type='email' 
                    value={this.state.email}
                    onChange={(e) => {this.updateInput('email', e)}}
                required/>
                <label htmlFor='password'>Password</label>
                <input 
                    id='password' 
                    name='password' 
                    type='password' 
                    value={this.state.password}
                    onChange={(e) => {this.updateInput('password', e)}}
                required/>
                <button type='submit'>Log In</button>
            </form>
        )
    }

    render() {
        return (
            <div>
                {this.outcomeBanner()}
                {this.emailPasswordForm()}
            </div>
        )
    }

}

export default LoginForm
