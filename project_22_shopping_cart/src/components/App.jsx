import { Link } from 'react-router-dom'
import '../styles/App.css'

function App() {
  return (
    <div id="main-container">
      <h1>Welcome to SpoonMart!</h1>
      <h3>How can I assist you?</h3>
      <ul>
        <li><Link to="/store">Show Merchandise</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </div>
  )
}

export default App
