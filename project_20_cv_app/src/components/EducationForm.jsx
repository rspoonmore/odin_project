import { useState } from 'react'
import '../../styles/EducationForm.css'
import SectionHeader from './SectionHeader'
import NewEducationForm from './NewEducationForm';
import EducationDisplay from './EducationDisplay';

function EducationForm({ cvData, setCVData}) {
    const blankEDU = {'id': crypto.randomUUID(), 'school': '', 'major': ''};
    const [showForm, setShowForm] = useState(true);
    const [showNewEduForm, setShowNewEduForm] = useState(true);
    const [education, setEducation] = useState(cvData['education'])
    const [currEdu, setCurrEdu] = useState(blankEDU);
    const [formIsNew, setFormIsNew] = useState(true)

    

    function showEducation(education) {
        return (
            <div className='education-display'>
                {education.map((edu) => {
                    if(edu.school != ''){
                        const onEdit = () => {
                            setFormIsNew(false)
                            setCurrEdu(edu)
                            setShowForm(true)
                            setShowNewEduForm(true)
                        }
                        return (<EducationDisplay key={edu.id + '-display'} eduPiece={edu} onEdit={onEdit}></EducationDisplay>)
                    }
                })}
            </div>
        )
    }

    function generateNewForm() {
        return (
            <NewEducationForm
                key = 'education-form'
                isNew = {formIsNew}
                setIsNew = {setFormIsNew}
                show = {showNewEduForm}
                setShow = {setShowNewEduForm}
                currEdu={currEdu}
                setCurrEdu={setCurrEdu}
                education={education}
                setEducation={setEducation}
                setCVData={setCVData}
            ></NewEducationForm>
        )
    }

    function showButtonClicked() {
        {if(showNewEduForm) {
            setCurrEdu(blankEDU);
        }}
        {setShowNewEduForm(!showNewEduForm);}
    }



    return (
        <div className='section'>
            <SectionHeader headerTitle='Education' showForm={showForm} setShowForm={setShowForm}></SectionHeader>
            <div id='education-content' className={showForm ? '' : 'hidden'}>
                {showEducation(education)}
                <button id='new-edu-form' onClick={showButtonClicked}>{showNewEduForm ? 'Hide New Form' : 'Add New'}</button>
                {generateNewForm()}
            </div>
        </div>
    )
}

export default EducationForm