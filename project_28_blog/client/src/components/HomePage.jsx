import { Component } from "react"
import '../styles/HomePage.css';
import { server } from '../public_fields'
import TopBar from "./partials/TopBar";

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

    setUser = (user) => {
        this.setState(prev => ({
            ...prev,
            currentUser: user
        }))
    }


    render() {
        return (
        <>
            <TopBar 
                userid={this.state.currentUser ? this.state.currentUser.userid : null}
                setUser={this.setUser}
            ></TopBar>
            <h1>Welcome to the Home Page{this.state.currentUser ? ` ${this.state.currentUser.firstname}!` : ''}</h1>
            {this.generateUsers()}
        </>
    )
    }
}


export default HomePage