import { useState } from 'react'
import './form.css'

function Form({ label = "", formKey = "", formID = "", value= null }) {
  const [formVal, setFormVal] = useState(value)

  const updateName = (event) => {
    console.log(event.target.value, formVal)
    setFormVal(event.target.value)
  }

  return (
    <>
      <form id={formID} >
        <fieldset form={formID}>
          <label>{label}</label>
          <input type='text' value={formVal} onChange={updateName}></input>
        </fieldset>
      </form>
    </>
  )
}

export default Form