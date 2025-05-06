import '../../styles/UISide.css'
import NameSection from './NameSection'
import EducationSection from './EducationSection'
import ExperienceSection from './ExperienceSection'

function UISide({cvData, setCVData}) {
    return (
        <div id='ui-side-container'>
            <NameSection 
                cvData = {cvData}
                setCVData = {setCVData}
            ></NameSection>

            <EducationSection
                cvData={cvData}
                setCVData={setCVData}
            ></EducationSection>

            <ExperienceSection
                cvData={cvData}
                setCVData={setCVData}
            ></ExperienceSection>
        </div>
    )
}

export default UISide