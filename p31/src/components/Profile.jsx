import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

const STORAGE_KEY = "fd-profile";

const DEFAULT_PROFILE = {
  name: "",
  majorOccupation: "",
  age: "",
};

function Profile() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [editMode, setEditMode] = useState(false);

  const nameRef = useRef();
  const majorRef = useRef();
  const ageRef = useRef();

  // Load from localStorage on mount
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

    return (
    <div>
      {/* Title */}
      <h1 style={{ margin: 0, marginBottom: "0.5rem" }}>My Profile</h1>

      {/* Button row */}
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

      {/* Profile fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <ProfileField label="Name"              value={profile.name}            editMode={editMode} inputRef={nameRef} />
        <ProfileField label="Major / Occupation" value={profile.majorOccupation} editMode={editMode} inputRef={majorRef} />
        <ProfileField label="Age"               value={profile.age}             editMode={editMode} inputRef={ageRef} />

        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "1rem" }}>4 Favorite Birds</strong>
          <div style={{
            marginTop: "0.5rem",
            padding: "1rem",
            border: "1px dashed var(--fd-border)",
            borderRadius: 8,
            color: "var(--fd-stone)",
            fontSize: "0.95rem",
            textAlign: "center"
          }}>
            4 Favorite Birds:
          </div>
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