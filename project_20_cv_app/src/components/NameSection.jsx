import { useState } from 'react'
import '../../styles/NameSection.css'
import SectionHeader from './SectionHeader'

function NameSection({ cvData, setCVData}) {
  const [showForm, setShowForm] = useState(true)

  const [demos, setDemos] = useState({
    'name': cvData.name,
    'email': cvData.email
  })

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
    setShowForm(false);
  }

  return (
    <div className='section'>
      <SectionHeader headerTitle='Demographic Info' showForm={showForm} setShowForm={setShowForm}></SectionHeader>
      <form id='name-form' onSubmit={handleSubmit} className={showForm ? '' : 'hidden'}>

        <fieldset form='name-form'>
          <label>Name:</label>
          <input type='text' name='name' value={getValue('name')} onChange={handleChange}></input>
          <label>Email Address:</label>
          <input type='email' name='email' value={getValue('email')} onChange={handleChange}></input>
        </fieldset>

        <input type='submit' value='submit' form='name-form'></input>
      </form>
    </div>
  )
}

export default NameSection