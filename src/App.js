import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'

const cardImages = [
  { source: "./img/alien.png", matched: false },
  { source: "./img/astronaut.png", matched: false },
  { source: "./img/earth.png", matched: false },
  { source: "./img/mars.png", matched: false },
  { source: "./img/meteor.png", matched: false },
  { source: "./img/moon.png", matched: false },
  { source: "./img/satelite.png", matched: false },
  { source: "./img/saturn.png", matched: false },
  { source: "./img/spaceshuttle.png", matched: false },
  { source: "./img/sun.png", matched: false },
  { source: "./img/ufo.png", matched: false },
  { source: "./img/zodiacsign.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const restartGame = () => {
    cards.forEach(card => {
      card.matched = false
    })
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    setTimeout(() => shuffleCards(), 300)
  }

  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) {
      return
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (!choiceOne || !choiceTwo) {
      return
    }
    setDisabled(true)
    if (choiceOne.source === choiceTwo.source) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.source === choiceOne.source) {
            return { ...card, matched: true }
          }
          return card
        })
      })
      resetTurn()
    }
    else {
      setTimeout(() => resetTurn(), 1000)
    }

  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="app">
      <div className="header-box">
        <h2 className="header">WebTech APL</h2>
        <div className="flexbox">
          <button className="new-game" onClick={restartGame}>neues Spiel</button>
          <span className="turns">Züge: {turns}</span>
        </div>
      </div>

      <div className="card-grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default App