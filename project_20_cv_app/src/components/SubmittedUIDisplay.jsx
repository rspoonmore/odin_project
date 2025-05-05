import '../../styles/SubmittedUIDisplay.css'

function EducationDisplay({section='education', sectionData, onEdit}) {
    if(section == 'education') {
        return (
            <div className='main-display'>
                <div className='word-display'>
                    <span><strong>{sectionData.school}</strong></span>
                    <span>{sectionData.major}</span>
                </div>
                <button onClick={onEdit}>Edit</button>
            </div>
        )
    }
    else if (section == 'experience') {
        function expDuration() {
            let retString = "No Date Span";
            if(sectionData.startDate == "") {
                return retString;
            }
            retString = sectionData.startDate;
            return retString + (sectionData.endDate == "" ? " - Present" : ` - ${sectionData.endDate}`)
        }
        return (
            <div className='main-display'>
                <div className='word-display'>
                    <span><strong>{sectionData.company}</strong></span>
                    <span>{expDuration()}</span>
                </div>
                <button onClick={onEdit}>Edit</button>
            </div>
        )
    }
    
}

export default EducationDisplay