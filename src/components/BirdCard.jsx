import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const FAVORITES_KEY = "fd-favorites";
const DECKS_KEY = "decks";

function BirdCard(props) {
  const [decks, setDecks] = useState({});
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  function handleOpen() {
    const saved = localStorage.getItem(DECKS_KEY);
    setDecks(saved ? JSON.parse(saved) : {});
    setOpen(o => !o);
  }

  function handleAddToDeck(deckName) {
    const deck = decks[deckName];
    const alreadyIn = deck.birds.some(b => b.speciesCode === props.bird.speciesCode);
    const updated = {
      ...decks,
      [deckName]: {
        ...deck,
        birds: alreadyIn
          ? deck.birds.filter(b => b.speciesCode !== props.bird.speciesCode)
          : [...deck.birds, props.bird]
      }
    };
    setDecks(updated);
    localStorage.setItem(DECKS_KEY, JSON.stringify(updated));
  }

  function handleAddToFavorites() {
    if (favorites.length >= 4) return;
    const alreadyIn = favorites.some(b => b.speciesCode === props.bird.speciesCode);
    if (alreadyIn) return;
    const updated = [...favorites, props.bird];
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }

  const deckList = Object.keys(decks);
  const isFavorited = favorites.some(b => b.speciesCode === props.bird.speciesCode);

  return (
    <Card>
      <Card.Img variant="top" src={props.bird.photo ?? ""} alt={props.bird.commonName} />
      <Card.Body>
        <Card.Title>{props.bird.commonName}</Card.Title>
        <Card.Text>{props.bird.sciName}</Card.Text>
        <Card.Text>{props.bird.familyComName}</Card.Text>

        <div style={{ position: "relative", display: "inline-block" }}>
          <Button size="sm" variant="primary" onClick={handleOpen}>
            Add to Deck ▾
          </Button>

          {open && (
            <div className="deck-dropdown">
              {deckList.length === 0 ? (
                <div className="deck-dropdown-empty">No decks yet — create one on the Decks page.</div>
              ) : (
                deckList.map(name => {
                  const alreadyIn = decks[name].birds.some(b => b.speciesCode === props.bird.speciesCode);
                  return (
                    <div
                      key={name}
                      className={`deck-dropdown-item ${alreadyIn ? "deck-dropdown-item--added" : ""}`}
                      onClick={() => handleAddToDeck(name)}
                    >
                      {alreadyIn ? `✓ ${name}` : name}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
        {' '}
        <Button
          size="sm"
          variant="outline-secondary"
          disabled={favorites.length >= 4 || isFavorited}
          onClick={handleAddToFavorites}
        >
          {isFavorited ? "★ Favorited" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BirdCard;