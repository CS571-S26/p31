import { Card } from "react-bootstrap";

function AboutBirdCard(props) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={props.photo}
        alt={props.commonName}
        style={{ width: "100%", objectFit: "contain" }}
      />
      <Card.Body style={{ padding: "0.75rem" }}>
        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--fd-forest)" }}>
          {props.commonName}
        </div>
        <div style={{ fontStyle: "italic", fontSize: "0.78rem", color: "var(--fd-stone)" }}>
          {props.sciName}
        </div>
        <div style={{ fontSize: "0.78rem", color: "var(--fd-text-muted)" }}>
          {props.familyComName}
        </div>
      </Card.Body>
    </Card>
  );
}

export default AboutBirdCard;