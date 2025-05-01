import { useState } from 'react'
import '../../styles/EducationForm.css'
import SectionHeader from './SectionHeader'
import NewEducationForm from './NewEducationForm';
import EducationDisplay from './EducationDisplay';

function slugify(str) {
    return str
      .replace(/[^A-Za-z0-9]+/g, '')  // remove anything that isn't A–Z, a–z, or 0–9
      .toLowerCase();
  }

function EducationForm({ cvData, setCVData}) {
    const [showForm, setShowForm] = useState(true);
    const [showNewEduForm, setShowNewEduForm] = useState(true);
    const [education, setEducation] = useState(cvData['education'])

    function getValue(key, value) {
        return education[key] ? education[key][value] : ""
    }

    function showEducation(education) {
        return (
            <div className='education-display'>
                {education.map((edu) => {
                    if(edu.school != ''){
                        return (<EducationDisplay key={edu.id + '-display'} eduPiece={edu}></EducationDisplay>)
                    }
                })}
            </div>
        )
    }

    function generateNewForm() {
        const [currEdu, setCurrEdu] = useState({'id': crypto.randomUUID(), 'school': '', 'major': ''});
        
        return (
            <NewEducationForm
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



    return (
        <div className='section'>
            <SectionHeader headerTitle='Education' showForm={showForm} setShowForm={setShowForm}></SectionHeader>
            <div id='education-content' className={showForm ? '' : 'hidden'}>
                {showEducation(education)}
                <button id='new-edu-form' onClick={() => {setShowNewEduForm(!showNewEduForm)}}>{showNewEduForm ? 'Hide New Form' : 'Add New'}</button>
                {generateNewForm()}
            </div>
        </div>
    )
}

export default EducationForm