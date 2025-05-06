import { useState } from 'react'
import '../../styles/EducationSection.css'
import SectionHeader from './SectionHeader'
import NewElementForm from './NewElementForm';
import SubmittedUIDisplay from './SubmittedUIDisplay';

function EducationSection({ cvData, setCVData}) {
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
                        return (<SubmittedUIDisplay key={edu.id + '-display'} section='education' sectionData={edu} onEdit={onEdit}></SubmittedUIDisplay>)
                    }
                })}
            </div>
        )
    }

    function generateNewForm() {
        return (
            <NewElementForm
                key = 'education-form'
                section='education'
                baseElement={blankEDU}
                isNew = {formIsNew}
                setIsNew = {setFormIsNew}
                show = {showNewEduForm}
                setShow = {setShowNewEduForm}
                currElement={currEdu}
                setCurrElement={setCurrEdu}
                currSectionData={education}
                setCurrSectionData={setEducation}
                setCVData={setCVData}
            ></NewElementForm>
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

export default EducationSection