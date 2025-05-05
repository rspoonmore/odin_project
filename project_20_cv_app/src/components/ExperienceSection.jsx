import { useState } from 'react'
import '../../styles/ExperienceSection.css'
import SectionHeader from './SectionHeader'
import SubmittedUIDisplay from './SubmittedUIDisplay';
import NewElementForm from './NewElementForm';

function ExperienceSection({ cvData, setCVData}) {
    const blankExp = {'id': crypto.randomUUID(), 'company': '', 'startDate': '', 'endDate': '', 'desc': ''};
    const [showForm, setShowForm] = useState(true);
    const [showNewExpForm, setShowNewExpForm] = useState(true);
    const [exp, setExp] = useState(cvData['experience'])
    const [currExp, setCurrExp] = useState(blankExp);
    const [formIsNew, setFormIsNew] = useState(true)

    

    function showExperience(experience) {
        return (
            <div className='experience-display'>
                {experience.map((x) => {
                    if(x.company != ''){
                        const onEdit = () => {
                            setFormIsNew(false)
                            setCurrExp(x)
                            setShowForm(true)
                            setShowNewExpForm(true)
                        }
                        return (<SubmittedUIDisplay key={x.id + '-display'} section='experience' sectionData={x} onEdit={onEdit}></SubmittedUIDisplay>)
                    }
                })}
            </div>
        )
    }

    function generateNewForm() {
        return (
            <NewElementForm
                key = 'experience-form'
                section='experience'
                baseElement={blankExp}
                isNew = {formIsNew}
                setIsNew = {setFormIsNew}
                show = {showNewExpForm}
                setShow = {setShowNewExpForm}
                currElement={currExp}
                setCurrElement={setCurrExp}
                currSectionData={exp}
                setCurrSectionData={setExp}
                setCVData={setCVData}
            ></NewElementForm>
        )
    }

    function showButtonClicked() {
        {if(showNewExpForm) {
            setCurrExp(blankExp);
        }}
        {setShowNewExpForm(!showNewExpForm);}
    }



    return (
        <div className='section'>
            <SectionHeader headerTitle='Experience' showForm={showForm} setShowForm={setShowForm}></SectionHeader>
            <div id='experience-content' className={showForm ? '' : 'hidden'}>
                {showExperience(exp)}
                <button id='new-exp-form' onClick={showButtonClicked}>{showNewExpForm ? 'Hide New Form' : 'Add New'}</button>
                {generateNewForm()}
            </div>
        </div>
    )
}

export default ExperienceSection