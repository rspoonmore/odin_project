import { Component } from "react"
import '../styles/HomePage.css';
// import { useEffect, useState } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };

        this.generateUsers = this.generateUsers.bind(this);
    }

    componentDidMount() {
        fetch('http://LocalHost:8000/users')
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


    render() {
        return (
        <>
            <h1>Welcom to the Home Page</h1>
            {this.generateUsers()}
        </>
    )
    }
}


export default HomePage