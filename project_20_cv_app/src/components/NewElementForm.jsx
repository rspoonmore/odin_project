import '../../styles/NewElementForm.css'

function NewElementForm({section='experience', baseElement={}, isNew = true, setIsNew, show, setShow, currElement, setCurrElement, currSectionData, setCurrSectionData, setCVData}) {
    function resetForm() {
        let newElement = baseElement;
        newElement['id'] = crypto.randomUUID();
        setCurrElement(newElement)
        setShow(false)
        setIsNew(true)
    }

    function updateCurrElementData({updater, newElementData}) {
        if(updater) {
            setCurrSectionData(prevState => {
                let newState = [...prevState];
                for(let i=0; i < newState.length; i++){
                    if(newState[i]['id'] == newElementData['id']) {
                        newState[i] = newElementData
                        return newState
                    }
                }
                return prevState
            })
        }
        else {
            setCurrSectionData(prevState => {
                return prevState.concat(newElementData)
            })
        }
    }

    function updateCVData() {
        setCVData(prevState => ({
            ...prevState,
            [section]: currSectionData
        }))
    }

    const submitNew = (event) => {
        event.preventDefault();
        const newElement = [{...currElement}]
        resetForm()
        updateCurrElementData({updater: false, newElementData: newElement})
        updateCVData()
    }

    const submitEdit = (event) => {
        event.preventDefault();
        const newElement = [{...currElement}]
        resetForm()
        updateCurrElementData({updater: true, newElementData: newElement[0]})
        updateCVData()
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
                <form id='exp-form' onSubmit={isNew ? submitNew : submitEdit} className={show ? '' : 'hidden'}>
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
                <form id='edu-form' onSubmit={isNew ? submitNew : submitEdit} className={show ? '' : 'hidden'}>
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