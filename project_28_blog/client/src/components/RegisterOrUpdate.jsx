import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import '../styles/RegisterOrUpdate.css';
import TopBar from "./partials/TopBar";
import RegistrationForm from "./partials/RegisterForm";
import EditUserForm from "./partials/EditUserForm";
import OutcomeBanner from "./partials/OutcomeBanner";
import { setCurrentUserIfCookie } from "../cookies/CookieHandler";

const RegisterOrUpdate = ({type='register'}) => {
    const [outcome, setOutcome] = useState(null);
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const loadPage = () => {
        setCurrentUserIfCookie(setCurrentUser)
    }

    useEffect(loadPage, [currentUser])

    function header() {
        if(type === 'register') {
            return 'Register a new user here'
        }
        return 'Update your user'
    }

    function form() {
        if(type === 'register') {
            return <RegistrationForm setOutcome={setOutcome}></RegistrationForm>
        } else {
            return <EditUserForm setOutcome={setOutcome}></EditUserForm>
        }
    }
        

    return (
        <div>
            <TopBar></TopBar>
            <h1>{header()}</h1>
            <OutcomeBanner outcome={outcome}></OutcomeBanner>
            {form()}
        </div>
    )
}

export default RegisterOrUpdate