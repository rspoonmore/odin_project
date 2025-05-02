import { useState } from 'react'
import '../../styles/NewEducationForm.css'

function NewEducationForm({isNew = true, setIsNew, show, setShow, currEdu, setCurrEdu, education, setEducation, setCVData}) {
    function resetForm() {
        setCurrEdu({'id': crypto.randomUUID(), 'school': '', 'major': ''})
        setShow(false)
    }

    const submitNew = (event) => {
        event.preventDefault();
        const newEdu = [{...currEdu}]
        resetForm()
        setEducation(prevState => {
            return prevState.concat(newEdu)
        })
        setCVData(prevState => ({
            ...prevState,
            'education': education
        }))
    }

    const submitEdit = (event) => {
        event.preventDefault();
        const newEdu = {...currEdu}
        resetForm()
        setEducation(prevState => {
            let newState = [...prevState];
            for(let i=0; i < newState.length; i++){
                if(newState[i]['id'] == newEdu['id']) {
                    newState[i] = newEdu
                    return newState
                }
            }
            return prevState
        })
        setCVData(prevState => ({
            ...prevState,
            'education': education
        }))
        setIsNew(true)
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
        <form id='edu-form' onSubmit={isNew ? submitNew : submitEdit} className={show ? '' : 'hidden'}>
                <label>School:</label>
                <input type='text' name='school' value={currEdu['school']} onChange={handleChange}></input>
                <label>Major:</label>
                <input type='text' name='major' value={currEdu['major']} onChange={handleChange}></input>
            <input type='submit' value='submit' form='edu-form'></input>
        </form> 
    )
}

export default NewEducationForm