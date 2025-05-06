import '../../styles/NewElementForm.css'

function NewElementForm({section='experience', baseElement={}, isNew = true, setIsNew, show, setShow, currElement, setCurrElement, currSectionData, setCurrSectionData, setCVData}) {
    function resetForm() {
        let newElement = baseElement;
        newElement['id'] = crypto.randomUUID();
        setCurrElement(newElement)
        setShow(false)
        setIsNew(true)
    }

    function updateData({newElementData}) {
        let newSectionData = [...currSectionData];
        if(!isNew) {
            for(let i=0; i < newSectionData.length; i++) {
                if(newSectionData[i]['id'] == newElementData[0]['id']) {
                    newSectionData[i] = newElementData[0]
                    break
                }
            }
        }
        else {
            newSectionData = [...currSectionData].concat(newElementData) 
            
        }
        setCurrSectionData(newSectionData)
        setCVData(prevState => {
            return {...prevState, [section]: newSectionData}
        })
    }

    const submitForm = (event) => {
        event.preventDefault();
        const newElement = [{...currElement}]
        resetForm()
        updateData({newElementData: newElement})
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCurrElement(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    function generateForm(){
        if(section == 'experience') {
            return (
                <form id='exp-form' onSubmit={submitForm} className={show ? '' : 'hidden'}>
                        <label>Company:</label>
                        <input type='text' name='company' value={currElement['company']} onChange={handleChange}></input>
                        <label>Start Date:</label>
                        <input type='text' name='startDate' value={currElement['startDate']} onChange={handleChange}></input>
                        <label>End Date:</label>
                        <input type='text' name='endDate' value={currElement['endDate']} onChange={handleChange}></input>
                        <label>Description:</label>
                        <textarea name='desc' value={currElement['desc']} onChange={handleChange}></textarea>
                    <input type='submit' value='submit' form='exp-form'></input>
                </form> 
            )
        }
        else {
            return (
                <form id='edu-form' onSubmit={submitForm} className={show ? '' : 'hidden'}>
                        <label>School:</label>
                        <input type='text' name='school' value={currElement['school']} onChange={handleChange}></input>
                        <label>Major:</label>
                        <input type='text' name='major' value={currElement['major']} onChange={handleChange}></input>
                    <input type='submit' value='submit' form='edu-form'></input>
                </form> 
            )
        }
    }


    return (generateForm())
}

export default NewElementForm