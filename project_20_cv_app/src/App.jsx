import { useState } from 'react'
import NameForm from './components/nameform.jsx'
import './App.css'

function App() {
  const sampleData = {
    'name': "John Doe",
    'email': 'john.doe@gmail.com',
    'school': 'State University',
    'major': 'Computer Science'
  }

  const emptyData = {
    'name': "",
    'email': "",
    'school': "",
    'major': ""
  }

  const useSampleData = false;

  const [cvData, setCVData] = useState(useSampleData ? sampleData : emptyData)

  return (
    <>
      <NameForm 
        cvData = {cvData}
        setCVData = {setCVData}
      >
        
      </NameForm>
    </>
  )
}

export default App


/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/