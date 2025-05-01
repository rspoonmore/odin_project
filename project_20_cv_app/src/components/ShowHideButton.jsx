import '../../styles/ShowHideButton.css'

function ShowHideButton({showForm, setShowForm}) {
    const updateFormState = () => {
        setShowForm(!showForm)
    }

    return (
        <button onClick={updateFormState}>{showForm ? '-' : '+'}</button>
    )
}

export default ShowHideButton