import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function DeckView(props) {
  return (
    <Container className="decks-container">
      <div className="decks-header">
        <div>
          <button className="deck-back-btn" onClick={props.onBack}>← Back to Decks</button>
          <h1 className="decks-title">{props.deck.name}</h1>
          <p className="decks-subtitle">{props.deck.birds.length} birds</p>
        </div>
        <Button variant="success" onClick={props.onStudy} disabled={props.deck.birds.length === 0}>
          Study this Deck
        </Button>
      </div>

      {props.deck.birds.length === 0 ? (
        <p className="decks-empty">No birds in this deck yet — add some from Browse.</p>
      ) : (
        <Row className="g-3">
          {props.deck.birds.map(bird => (
            <Col key={bird.speciesCode} xs={6} sm={4} md={3}>
              <Card>
                <Card.Img
                  variant="top"
                  src={bird.photo ?? ""}
                  alt={bird.commonName}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "0.95rem" }}>{bird.commonName}</Card.Title>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => props.onRemoveBird(bird.speciesCode)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default DeckView;