import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { server } from '../../public_fields'

const EditUserForm = (setOutcome = null) => {
    const { userid } = useParams();
    const blankUserData = {'email': '', 'firstName': '', 'lastName': '', 'adminCode': ''};
    const [userData, setUserData] = useState(blankUserData);
    const [showForm, setShowForm] = useState(true);
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    
    function loadUserToForm(user) {
        setUserData(prev => ({
            ...prev,
            email: user.email,
            firstName: user.firstname || '',
            lastName: user.lastname || ''
        })
    )
    }

    useEffect(() => {
        console.log(`Getting userid ${userid} data`)
        try {
            fetch(`${server}/users/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then(res => {
                    if(res.success && res.user) {
                        loadUserToForm(res.user)
                        if(setOutcome) {setOutcome.setOutcome(null)}
                    } else if (setOutcome) {
                        setOutcome.setOutcome(res)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    async function updateUser(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            for(const key in userData) {
                formData[key] = userData[key];
            }
            await fetch(`${server}/users/${userid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(res => {
                    if(res.success) {
                        if (Number(userid) === Number(currentUser.userid)) {
                            setCurrentUser(res.user)
                        }
                        setUserData(blankUserData);
                        setShowForm(false);
                    }
                    if (setOutcome) {setOutcome.setOutcome(res)}
                })
        } catch(error) {
            console.log(error)
        }
    }

    if(!showForm) {return <></>}

    return (
        <form className='form-register' onSubmit={updateUser}>
            <fieldset>
                <label htmlFor='email'>Email*</label>
                <input 
                    id='email' 
                    name='email' 
                    type='email' 
                    value={userData['email']}
                    onChange={(e) => {setUserData(prev => ({...prev, email: e.target.value}))}}
                required/>

                <label htmlFor='firstName'>First Name</label>
                <input 
                    id='firstName' 
                    name='firstName' 
                    type='text' 
                    value={userData['firstName']}
                    onChange={(e) => {setUserData(prev => ({...prev, firstName: e.target.value}))}}
                />

                <label htmlFor='lastName'>Last Name</label>
                <input 
                    id='lastName' 
                    name='lastName' 
                    type='text' 
                    value={userData['lastName']}
                    onChange={(e) => {setUserData(prev => ({...prev, lastName: e.target.value}))}}
                />

                <label htmlFor='adminCode'>Admin Code</label>
                <input 
                    id='adminCode' 
                    name='adminCode' 
                    type='password' 
                    value={userData['adminCode']}
                    onChange={(e) => {setUserData(prev => ({...prev, adminCode: e.target.value}))}}
                />
            </fieldset>
            <button type='submit'>Update</button>
            <div>*Required</div>
        </form>
    )
}

export default EditUserForm