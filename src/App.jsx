import React, { useEffect, useState } from "react";

import Card from "./components/Card";
import Loading from "./components/Loading";
import cardsList from "./utils/cardsList";
import randomId from "./utils/randomId";

function App() {
  // states
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabledCard, setDisabledCard] = useState(false);
  // function to shuffle the cards
  const startGame = () => {
    const shuffledCards = [...cardsList, ...cardsList]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: randomId() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setLoading(false);
    setTurns(0);
  };

  // function to handle choice of card
  const handleChoice = (card) => {
    if (!disabledCard) {
      return () => {
        if (choiceOne && choiceOne.id !== card.id) {
          setChoiceTwo(card);
        } else {
          setChoiceOne(card);
        }
      };
    }
  };

  // function to rest choices
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
      if (choiceOne.emoji === choiceTwo.emoji) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.emoji === choiceOne.emoji) {
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

  // check if all cards are matched and show message
  useEffect(() => {
    if (!loading && cards.every((card) => card.matched)) {
      console.log(cards.every((card) => card.matched));
      setTimeout(() => {
        window.confirm("You win! Do you want to play again?") && startGame();
      }, 1000);
    }
  }, [cards, loading]);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        {/*  header */}
        <h1 className="logo-font text-center uppercase font-medium text-2xl">
          emg
        </h1>
        <button className="danger-btn" onClick={startGame}>
          restart
        </button>
        {/* cards */}
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
        {/* turns */}
        <p className="uppercase">
          turns <span className="font-medium">({turns})</span>
        </p>
      </div>
    </div>
  );
}

export default App;
