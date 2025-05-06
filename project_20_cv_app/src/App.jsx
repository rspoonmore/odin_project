import { useState } from 'react'
import './App.css'
import UISide from './components/UISide'
import CVDisplay from './components/CVDisplay'

function App() {
  const sampleData = {
    'name': "John Doe",
    'email': 'john.doe@gmail.com',
    'education': [{'id': crypto.randomUUID(), 'school': 'University of Tech', 'major': 'Computer Science'}],
    'experience': [{'id': crypto.randomUUID(), 'company': 'Company A', 'startDate': '2024', 'endDate': '', 'desc': 'description of role'}]
  }
  const emptyData = {
    'name': "",
    'email': "",
    'education': [],
    'experience': []
  }

  const useSampleData = false;

  const [cvData, setCVData] = useState(useSampleData ? sampleData : emptyData)

  return (
    <div className='main-container'>
      <UISide cvData={cvData} setCVData={setCVData}></UISide>
      <CVDisplay cvData={cvData}></CVDisplay>
    </div>
  )
}

export default App
