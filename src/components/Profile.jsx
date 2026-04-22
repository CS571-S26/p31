import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";

const STORAGE_KEY = "fd-profile";
const FAVORITES_KEY = "fd-favorites";

const DEFAULT_PROFILE = {
  name: "",
  majorOccupation: "",
  age: "",
};

function Profile() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [editMode, setEditMode] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const nameRef = useRef();
  const majorRef = useRef();
  const ageRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  function handleSave() {
    const updated = {
      name: nameRef.current.value,
      majorOccupation: majorRef.current.value,
      age: ageRef.current.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProfile(updated);
    setEditMode(false);
  }

  function handleCancel() {
    setEditMode(false);
  }

  function handleRemoveFavorite(speciesCode) {
    const updated = favorites.filter(b => b.speciesCode !== speciesCode);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }

  return (
    <div>
      <h1 style={{ margin: 0, marginBottom: "0.5rem" }}>My Profile</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {!editMode && (
          <Button variant="outline-success" size="sm" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
        {editMode && (
          <>
            <Button variant="success" size="sm" onClick={handleSave}>Save</Button>
            <Button variant="danger" size="sm" onClick={handleCancel}>Cancel</Button>
          </>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <ProfileField label="Name"               value={profile.name}            editMode={editMode} inputRef={nameRef} />
        <ProfileField label="Major / Occupation"  value={profile.majorOccupation} editMode={editMode} inputRef={majorRef} />
        <ProfileField label="Age"                value={profile.age}             editMode={editMode} inputRef={ageRef} />

        {/* Favorites Section */}
        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "1rem" }}>4 Favorite Birds</strong>

          {favorites.length === 0 ? (
            <div style={{
              marginTop: "0.5rem",
              padding: "1rem",
              border: "1px dashed var(--fd-border)",
              borderRadius: 8,
              color: "var(--fd-stone)",
              fontSize: "0.9rem",
              textAlign: "center"
            }}>
              No favorites yet — add up to 4 from Browse.
            </div>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
              {favorites.map(bird => (
                  <Card key={bird.speciesCode} style={{ maxWidth: "200px" }}>
                    <Card.Img
                      variant="top"
                      src={bird.photo ?? ""}
                      alt={bird.commonName}
                      style={{ width: '100%', objectFit: "cover" }}
                    />
                    <Card.Body style={{ padding: "10px" }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--fd-text-dark)" }}>
                        {bird.commonName}
                      </div>
                      <div style={{ fontSize: "0.72rem", fontStyle: "italic", color: "var(--fd-stone)" }}>
                        {bird.sciName}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--fd-text-muted)", marginBottom: "0.4rem" }}>
                        {bird.familyComName}
                      </div>
                      <button
                        onClick={() => handleRemoveFavorite(bird.speciesCode)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#c0392b",
                          cursor: "pointer",
                          fontSize: "0.78rem",
                          padding: 0,
                          fontWeight: 600,
                        }}
                      >
                        X Remove
                      </button>
                    </Card.Body>
                  </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, editMode, inputRef }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ fontWeight: 600, minWidth: 180, color: "var(--fd-text-muted)", fontSize: "1rem" }}>
        {label}:
      </span>
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
        <span style={{ color: "var(--fd-text-dark)", fontSize: "1rem" }}>
          {value || <span style={{ color: "var(--fd-stone)", fontStyle: "italic" }}>Not set</span>}
        </span>
      )}
    </div>
  );
}

export default Profile;