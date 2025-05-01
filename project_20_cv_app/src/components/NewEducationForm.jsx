import { useState } from 'react'
import '../../styles/NewEducationForm.css'

function NewEducationForm({show, setShow, currEdu, setCurrEdu, education, setEducation, setCVData}) {
    function resetForm() {
        setCurrEdu({'id': crypto.randomUUID(), 'school': '', 'major': ''})
        setShow(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEdu = [{...currEdu}]
        console.log(newEdu)
        resetForm()
        setEducation(prevState => {
            return prevState.concat(newEdu)
        })
        setCVData(prevState => ({
            ...prevState,
            'education': education
        }))
        console.log(education)
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCurrEdu(prevState => ({
            ...prevState,
            [name]: value,
        }))
        
    }


    return (
        <form id='edu-form' onSubmit={handleSubmit} className={show ? '' : 'hidden'}>
                <label>School:</label>
                <input type='text' name='school' value={currEdu['school']} onChange={handleChange}></input>
                <label>Major:</label>
                <input type='text' name='major' value={currEdu['major']} onChange={handleChange}></input>
            <input type='submit' value='submit' form='edu-form'></input>
        </form> 
    )
}

export default NewEducationForm