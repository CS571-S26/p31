import React from "react";
import { Button, Card } from 'react-bootstrap';

function BirdCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.bird.photo ?? ""} alt={props.bird.commonName} />
      <Card.Body>
        <Card.Title>{props.bird.commonName}</Card.Title>
        <Card.Text>{props.bird.sciName}</Card.Text>
        <Card.Text>{props.bird.familyComName}</Card.Text>
          <Button variant="primary">Add to Deck</Button>{' '}
        <Button variant="danger" size="sm">Add to Favorites</Button>
      </Card.Body>
    </Card>
  );
}

export default BirdCard;