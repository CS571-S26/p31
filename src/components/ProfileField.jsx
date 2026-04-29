import { Form } from "react-bootstrap";

export default function ProfileField(props) {
  const inputId = props.label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Form.Label htmlFor={inputId} className="profile-label">{props.label}:</Form.Label>
      {props.editMode ? (
        <Form.Control
          id={inputId}
          ref={props.inputRef}
          defaultValue={props.value}
          placeholder={props.label}
          style={{
            border: "1px solid var(--fd-border)",
            borderRadius: 6,
            padding: "0.3rem 0.75rem",
            fontSize: "1rem",
            color: "var(--fd-text-dark)",
            background: "#ededed",
            outline: "none",
          }}
        />
      ) : (
        <span className="profile-value">
          {props.value || <span style={{ color: "var(--fd-stone)", fontStyle: "italic" }}>Not set</span>}
        </span>
      )}
    </div>
  );
}