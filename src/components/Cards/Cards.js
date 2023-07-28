import "./Cards.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../Card/Card";

const Cards = () => {
  const [deckId, setDeckId] = useState(null);
  const [cardsArray, setCardsArray] = useState([]);
  const [shuffleTheDeck, setShuffleTheDeck] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const rotateDeg = Math.random() * 140 - 70;
  useEffect(() => {
    setCardsArray([]);
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((response) => {
        setIsLoading(false);
        setDeckId(response.data.deck_id);
      });
  }, [shuffleTheDeck]);
  console.log(deckId);
  const getNewCard = () => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => {
        if (res.data.cards[0])
          setCardsArray(() => {
            const card = res.data.cards[0];
            card.rotate = rotateDeg;
            return [...cardsArray, card];
          });
        else {
          alert("Error: no cards remaining!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="Cards">
      <div>
        <button
          className="cards-btn"
          onClick={getNewCard}
          disabled={isLoading ? true : false}
        >
          {isLoading ? "loading" : "Get a Card!"}
        </button>
        <button
          className="cards-btn"
          onClick={() => setShuffleTheDeck(!shuffleTheDeck)}
        >
          Shuffle The Deck
        </button>
      </div>
      <div className="Cards-list">
        {cardsArray.map((card) => (
          <Card card={card} key={card.code} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
