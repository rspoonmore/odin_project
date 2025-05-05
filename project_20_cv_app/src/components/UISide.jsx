import '../../styles/UISide.css'
import NameForm from './nameform'
import EducationForm from './EducationForm'
import ExperienceSection from './ExperienceSection'

function UISide({cvData, setCVData}) {
    return (
        <div id='ui-side-container'>
            <NameForm 
                cvData = {cvData}
                setCVData = {setCVData}
            ></NameForm>

            <EducationForm
                cvData={cvData}
                setCVData={setCVData}
            ></EducationForm>

            <ExperienceSection
                cvData={cvData}
                setCVData={setCVData}
            ></ExperienceSection>
        </div>
    )
}

export default UISide