import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Study(props) {
  const [cards, setCards] = useState(() => shuffle(props.deck.birds));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [finished, setFinished] = useState(false);

  function handleNext() {
    if (index + 1 >= cards.length) {
      setFinished(true);
    } else {
      setIndex(i => i + 1);
      setFlipped(false);
    }
  }

  function handleReshuffle() {
    setCards(shuffle(props.deck.birds));
    setIndex(0);
    setFlipped(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="study-container">
        <button className="deck-back-btn" onClick={props.onBackToDeck}>← Back to Deck</button>
        <div className="study-finished">
          <h2>You finished the deck!</h2>
          <p>{cards.length} cards reviewed.</p>
          <Button variant="success" onClick={handleReshuffle}>Reshuffle & Study Again</Button>
        </div>
      </div>
    );
  }

  const bird = cards[index];

  return (
    <div className="study-container">
      <button className="deck-back-btn" onClick={props.onBackToDeck}>← Back to Deck</button>
      <p className="study-progress">{index + 1} / {cards.length}</p>

      {/* Flashcard */}
      <div className="flashcard-wrap" onClick={() => setFlipped(f => !f)}>
        <div className={`flashcard-inner ${flipped ? "flipped" : ""}`}>

          {/* Front — photo */}
          <div className="flashcard-front">
            {bird.photo
              ? <img src={bird.photo} alt={bird.commonName} className="flashcard-img" />
              : <div className="flashcard-no-img">No photo available</div>
            }
            <p className="flashcard-hint">Click to flip</p>
          </div>

          {/* Back — info */}
          <div className="flashcard-back">
            <h2 className="flashcard-common">{bird.commonName}</h2>
            <p className="flashcard-sci">{bird.sciName}</p>
            <p className="flashcard-family">{bird.familyComName}</p>
          </div>

        </div>
      </div>

      <div className="study-controls">
        <Button variant="outline-success" onClick={handleNext}>
          {index + 1 === cards.length ? "Finish" : "Next →"}
        </Button>
      </div>
    </div>
  );
}

export default Study;