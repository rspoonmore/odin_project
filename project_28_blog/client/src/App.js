import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [header, setHeader] = useState(null);

  async function performGet() {
    fetch('http://LocalHost:8000/users')
    .then(res => res.json())
    .then(json => setHeader(() => { return json ? json.action : null }))
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <h1>{header ? header : 'Press the button'}</h1>
      <button onClick={performGet}>Get Request</button>
    </div>
  );
}

export default App;
