import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import DeckView from "../components/DeckView";
import Study from "../components/Study";

const DECKS_KEY = "decks";

function Decks() {
  const [decks, setDecks] = useState(() => {
    const saved = localStorage.getItem("decks");
    return saved ? JSON.parse(saved) : {};
  });
  const [view, setView] = useState(() => localStorage.getItem("activeView") || "grid");
  const [activeDeck, setActiveDeck] = useState(() => localStorage.getItem("activeDeck") || null);
  const [newDeckName, setNewDeckName] = useState("");
  const [error, setError] = useState("");

  // Persist view and active deck to localStorage
  useEffect(() => {
    localStorage.setItem("activeView", view);
    if (activeDeck) localStorage.setItem("activeDeck", activeDeck);
  }, [view, activeDeck]);

  function handleCreateDeck() {
    const name = newDeckName.trim();
    if (!name) return setError("Please enter a deck name.");
    if (decks[name]) return setError("A deck with that name already exists.");
    if (Object.keys(decks).length >= 10) return setError("Maximum of 10 decks reached.");

    const updated = { ...decks, [name]: { name, birds: [] } };
    setDecks(updated);
    localStorage.setItem("decks", JSON.stringify(updated));
    setNewDeckName("");
    setError("");
  }

  function handleDeleteDeck(deckName) {
    const updated = { ...decks };
    delete updated[deckName];
    setDecks(updated);
    localStorage.setItem("decks", JSON.stringify(updated));
  }

  function handleRemoveBird(deckName, speciesCode) {
    const updated = {
      ...decks,
      [deckName]: {
        ...decks[deckName],
        birds: decks[deckName].birds.filter(b => b.speciesCode !== speciesCode)
      }
    };
    setDecks(updated);
    localStorage.setItem("decks", JSON.stringify(updated));
  }

  function handleViewDeck(deckName) {
    setActiveDeck(deckName);
    setView("deck");
  }

  function handleStudy(deckName) {
    setActiveDeck(deckName);
    setView("study");
  }

  function handleBack() {
    setView("grid");
    setActiveDeck(null);
    localStorage.removeItem("activeView");
    localStorage.removeItem("activeDeck");
  }

  if (view === "deck" && activeDeck) {
    return (
      <DeckView
        deck={decks[activeDeck]}
        onBack={handleBack}
        onRemoveBird={(code) => handleRemoveBird(activeDeck, code)}
        onStudy={() => handleStudy(activeDeck)}
      />
    );
  }

  if (view === "study" && activeDeck) {
    return (
      <Study
        deck={decks[activeDeck]}
        onBack={handleBack}
        onBackToDeck={() => handleViewDeck(activeDeck)}
      />
    );
  }

  // Grid view
  return (
    <Container className="decks-container">

      {/* Header row */}
      <div className="decks-header">
        <h1 className="decks-title">My Decks</h1>
        <div className="decks-create">
          <input
            className="decks-input"
            type="text"
            placeholder="New deck name..."
            value={newDeckName}
            onChange={e => setNewDeckName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleCreateDeck()}
            maxLength={30}
          />
          <Button
            variant="success"
            size="sm"
            onClick={handleCreateDeck}
            disabled={Object.keys(decks).length >= 10}
          >
            + Create
          </Button>
          {error && <span className="decks-error">{error}</span>}
        </div>
      </div>

      {Object.keys(decks).length === 0 ? (
        <p className="decks-empty">No decks yet — create one above to get started.</p>
      ) : (
        <Row className="g-3">
          {Object.values(decks).map(deck => (
            <Col key={deck.name} xs={12} sm={6} md={4} lg={3}>
              <div className="deck-tile">
                <div className="deck-tile-name">{deck.name}</div>
                <div className="deck-tile-count">{deck.birds.length} birds</div>
                <div className="deck-tile-buttons">
                  <Button size="sm" variant="outline-success" onClick={() => handleViewDeck(deck.name)}>
                    View
                  </Button>
                  <Button size="sm" variant="success" onClick={() => handleStudy(deck.name)} disabled={deck.birds.length === 0}>
                    Study
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDeleteDeck(deck.name)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Decks;