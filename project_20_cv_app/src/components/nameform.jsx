import { useState } from 'react'
import '../../styles/nameform.css'

function NameForm({ cvData, setCVData}) {
  const [demos, setDemos] = useState({
    'name': cvData.name,
    'email': cvData.email,
    'school': cvData.school,
    'major': cvData.major
  })

  function getPlaceholder(key, fallback) {
    return demos[key] == "" ? fallback : demos[key];
  }

  function getValue(key) {
    return demos[key] ? demos[key] : ""
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setDemos(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setCVData(prevState => ({
      ...prevState,
      ...demos
    }))
    console.log(cvData)
  }

  return (
    <div>
      <h2>Demographic Info</h2>
      <form id='name-form' onSubmit={handleSubmit}>

        <fieldset form='name-form'>
          <legend>Personal Details</legend>
          <label>Name:</label>
          <input type='text' name='name' value={getValue('name')} onChange={handleChange}></input>
          <label>Email Address:</label>
          <input type='email' name='email' value={getValue('email')} onChange={handleChange}></input>
        </fieldset>

        <fieldset form='name-form'>
          <legend>Education</legend>
          <label>School:</label>
          <input type='text' name='school' value={getValue('school')} onChange={handleChange}></input>
          <label>Major:</label>
          <input type='text' name='major' value={getValue('major')} onChange={handleChange}></input>
        </fieldset>

        <input type='submit' value='submit' form='name-form'></input>
      </form>
    </div>
  )
}

export default NameForm