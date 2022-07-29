import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Loading from "./components/Loading";

import cardsList from "./utils/cardsList";

function App() {
  // states
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabledCard, setDisabledCard] = useState(false);
  // shuffle cards
  const startGame = () => {
    const shuffledCards = [...cardsList, ...cardsList]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setLoading(false);
    setTurns(0);
  };

  // handle choice of card
  const handleChoice = (card) => {
    if (!disabledCard) {
      return () => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
      };
    }
  };

  // rest choices
  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabledCard(false);
    setTurns((prevTurns) => prevTurns + 1);
  };

  // start game automatically
  useEffect(() => {
    startGame();
  }, []);

  // check if cards are the same
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabledCard(true);
      if (choiceOne.name === choiceTwo.name) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.name === choiceOne.name) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetChoices();
      } else {
        setTimeout(() => resetChoices(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 className="logo-font text-center uppercase font-medium text-2xl">
          memory game
        </h1>
        <button className="danger-btn" onClick={startGame}>
          restart game
        </button>
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              data={card}
              onChoice={handleChoice(card)}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </div>
        <p className="uppercase">
          turns <span className="font-medium">{turns}</span>
        </p>
        <p className="font-light mt-10">
          thanks{" "}
          <a href="https://icons8.com" className="text-sky-600 underline">
            icons8
          </a>{" "}
          for all greatest icons
        </p>
      </div>
    </div>
  );
}

export default App;
