import NameForm from './nameform'
import '../../styles/UISide.css'
import EducationForm from './EducationForm'

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
        </div>
    )
}

export default UISide