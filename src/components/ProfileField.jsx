

export default function ProfileField({ label, value, editMode, inputRef }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span className="profile-label">{label}:</span>
      {editMode ? (
        <input
          ref={inputRef}
          defaultValue={value}
          placeholder={label}
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
          {value || <span style={{ color: "var(--fd-stone)", fontStyle: "italic" }}>Not set</span>}
        </span>
      )}
    </div>
  );
}

 ProfileField;