import { useState, useEffect } from 'react';
import '../styles/App.css';
import Card from './Card';

function App() {
  let startingData = {
    'pikachu': null,
    'charizard': null,
    'nidoking': null,
    'blastoise': null,
    'mewtwo': null,
    'onix': null
  }

  const [data, setData] = useState(startingData); 

  function getAPIData() {
    for(const pokemon in startingData) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
      fetch(url, {mode: 'cors'})
      .then(response => response.json())
      .then(json => setData(oldData => ({
        ...oldData,
        [pokemon]: json
      })))
      .catch(error => console.log(error))
    }
  }

  function generateCards() {
    let cards = []
    for(const key in data) {
      if(data[key]) {
        cards.push(
          <Card
            key={`${key}-card`}
            name={key}
            id={data[key]['id']}
            imgUrl={data[key]['sprites']['front_default']}
          ></Card>

        )
      }
    }
    return cards;
  }

  // eslint-disable-next-line
  useEffect(getAPIData, [])

  return (
    <div className="App">
      <div className='board'>
        {generateCards()}
        </div>
    </div>
  );
}

export default App;
