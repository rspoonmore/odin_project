import { useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/RegisterOrUpdate.css';
import TopBar from "./partials/TopBar";
import RegistrationForm from "./partials/RegisterForm";

const RegisterOrUpdate = ({type='register'}) => {
    const [outcome, setOutcome] = useState(null);
    const params = useParams();
    
    function outcomeBanner() {
        if (outcome) {
            return (
                <div className = {outcome.success ? 'outcome-banner-success' : 'outcome-banner-fail'}>
                    {outcome.message}
                </div>
            )
        }
        return <></>
    }

    function header() {
        if(type === 'register') {
            return 'Register a new user here'
        }
        return 'Update your user'
    }

    function form() {
        if(type === 'register') {
            return <RegistrationForm setOutcome={setOutcome}></RegistrationForm>
        }
    }
        

    return (
        <div>
            <TopBar></TopBar>
            <h1>{header()}</h1>
            {outcomeBanner()}
            {form()}
        </div>
    )
}

export default RegisterOrUpdate