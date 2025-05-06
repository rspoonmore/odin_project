import '../../styles/CVDisplay.css'

function CVDisplay({cvData}) {
    function demoData() {
        return (
            <div key='demographic-cv-display' className='section'>
                <h2>{cvData.name}</h2>
                <h3>{cvData.email}</h3>
            </div>
        )
    }

    function educationData() {
        return (
            <div className='section'>
                <h2>Education</h2>
                {cvData.education.map(edu => {
                    return (
                        <div key={`${edu.id}-cv-display`} className='element'>
                            <span><strong>{edu.school}</strong></span>
                            <span>{edu.major}</span>
                        </div>
                    )
                })}
            </div>
        )
    }

    function expDuration(startDate, endDate) {
        let retString = "No Date Span";
        if(startDate == "") {
            return retString;
        }
        retString = startDate;
        return retString + (endDate == "" ? " - Present" : ` - ${endDate}`)
    }

    function experienceData() {
        return (
            <div className='section'>
                <h2>Experience</h2>
                {cvData.experience.map(exp => {
                    return (
                        <div key={`${exp.id}-cv-display`} className='element'>
                            <span><strong>{exp.company}</strong></span>
                            <span>{expDuration(exp.startDate, exp.endDate)}</span>
                            <span>{exp.desc}</span>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className='container'>
            {demoData()}
            {educationData()}
            {experienceData()}
        </div>
    )
}

export default CVDisplay