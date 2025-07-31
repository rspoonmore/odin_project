import { Component } from "react"
import '../styles/HomePage.css';
import { server } from '../public_fields'
import LoginForm from './LoginForm';

class HomePage extends Component {
    constructor({users, currentUser}) {
        super();

        this.state = {
            users: users,
            currentUser: currentUser,
            showLogin: false
        };

        this.generateUsers = this.generateUsers.bind(this);
    }

    componentDidMount() {
        fetch(`${server}/users`)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.setState(currentState => ({
                        ...currentState,
                        users: json.users
                    }))
                }})
            .catch(err => console.log(err))
    }

    generateUsers() {
        if(!this.state.users) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div>
                <h3>Users:</h3>
                <ul>
                    {this.state.users.map(user => {
                        return <li key={user.userid}>{user.email}</li>
                    })}
                </ul>
            </div>
        )
    }

    showLoginForm() {
        if(this.state.showLogin) {
            const acceptLogin = (res) => {
                if(!res) {return}
                console.log(res)
                this.setState(prev => ({...prev, currentUser:res, showLogin:false}))
            }
            return <LoginForm setUser={acceptLogin}></LoginForm>
        }
    }


    render() {
        return (
        <>
            <h1>Welcom to the Home Page{this.state.currentUser ? ` ${this.state.currentUser.firstname}!` : ''}</h1>
            {this.showLoginForm()}
            <button onClick={() => this.setState(prev => ({...prev, showLogin: !prev['showLogin']}))}>{this.state.showLogin ? 'Cancel' : 'Log In'}</button>
            {this.generateUsers()}
        </>
    )
    }
}


export default HomePage