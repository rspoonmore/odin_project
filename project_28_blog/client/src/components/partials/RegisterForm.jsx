import { useState } from 'react';
import { server } from '../../public_fields'

const RegistrationForm = (setOutcome = null) => {
    const blankRegData = {'email': '', 'firstName': '', 'lastName': '', 'password': '', 'adminCode': ''};
    const [registrationData, setRegistrationData] = useState(blankRegData);
    const [showForm, setShowForm] = useState(true);

    async function register(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            for(const key in registrationData) {
                formData[key] = registrationData[key];
            }
            await fetch(`${server}/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(res => {
                    if(res.success) {
                        setRegistrationData(blankRegData);
                        setShowForm(false);
                        if (setOutcome) {setOutcome.setOutcome(null)}
                    }
                    if (setOutcome) {setOutcome.setOutcome(res)}
                })
        } catch(error) {
            console.log(error)
        }
    }

    if(!showForm) {return <></>}

    return (
        <form className='form-register' onSubmit={register}>
            <fieldset>
                <label htmlFor='email'>Email*</label>
                <input 
                    id='email' 
                    name='email' 
                    type='email' 
                    value={registrationData['email']}
                    onChange={(e) => {setRegistrationData(prev => ({...prev, email: e.target.value}))}}
                required/>

                <label htmlFor='firstName'>First Name</label>
                <input 
                    id='firstName' 
                    name='firstName' 
                    type='text' 
                    value={registrationData['firstName']}
                    onChange={(e) => {setRegistrationData(prev => ({...prev, firstName: e.target.value}))}}
                />

                <label htmlFor='lastName'>Last Name</label>
                <input 
                    id='lastName' 
                    name='lastName' 
                    type='text' 
                    value={registrationData['lastName']}
                    onChange={(e) => {setRegistrationData(prev => ({...prev, lastName: e.target.value}))}}
                />

                <label htmlFor='password'>Password*</label>
                <input 
                    id='password' 
                    name='password' 
                    type='password' 
                    value={registrationData['password']}
                    onChange={(e) => {setRegistrationData(prev => ({...prev, password: e.target.value}))}}
                required/>

                <label htmlFor='adminCode'>Admin Code</label>
                <input 
                    id='adminCode' 
                    name='adminCode' 
                    type='password' 
                    value={registrationData['adminCode']}
                    onChange={(e) => {setRegistrationData(prev => ({...prev, adminCode: e.target.value}))}}
                />
            </fieldset>
            <button type='submit'>Register</button>
            <div>*Required</div>
        </form>
    )
}

export default RegistrationForm