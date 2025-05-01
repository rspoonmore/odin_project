import { useState } from 'react'
import '../../styles/EducationDisplay.css'

function EducationDisplay({eduPiece}) {

    return (
        <div className='main-display'>
            <div className='word-display'>
                <span><strong>{eduPiece.school}</strong></span>
                <span>{eduPiece.major}</span>
            </div>
            <button>Edit</button>
        </div>
    )
}

export default EducationDisplay