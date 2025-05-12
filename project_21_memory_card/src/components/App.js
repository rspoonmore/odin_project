import { useState, useEffect } from 'react';
import '../styles/App.css';
import Card from './Card';

function App() {
  let startingData = {
    'pikachu': null,
    'venusaur': null,
    'blastoise': null,
    'charizard': null,
    'nidoking': null,
    'nidoqueen': null,
    'mewtwo': null,
    'onix': null,
    'poliwrath': null,
    'hitmonlee': null,
    'dragonite': null
  }

  const [data, setData] = useState(startingData); 
  const [score, setScore] = useState({'currentScore': 0, 'highScore': 0, 'selected': []});

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

  function shuffleData(currDataDict) {
    const entries = Object.entries(currDataDict);

    for(let i = entries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [entries[i], entries[j]] = [entries[j], entries[i]];
    }
    return Object.fromEntries(entries)
  }

  const cardSelected = (pokemonID) => () => {
    if (score['selected'].includes(pokemonID)) {
      // reset game
      setScore(prevData => {
        return {
          'currentScore': 0,
          'highScore': prevData['highScore'],
          'selected': []
        }
      })

    }
    else {
      // continue with increased score
      setScore(prevData => {
        return {
          'currentScore': prevData['currentScore'] + 1,
          'highScore': prevData['highScore'] > prevData['currentScore'] + 1 ? prevData['highScore'] : prevData['currentScore'] + 1,
          'selected': prevData['selected'].concat([pokemonID])
        }
      })
    }
    setData(prevData => shuffleData(prevData))
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
            selectFunc={cardSelected(data[key]['id'])}
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
      <h1>See how many pokemon cards you can select without repeating any!</h1>
      <h3>Current Score: {score['currentScore']}</h3>
      <h3>High Score: {score['highScore']}</h3>
      <div className='board'>
        {generateCards()}
        </div>
    </div>
  );
}

export default App;
