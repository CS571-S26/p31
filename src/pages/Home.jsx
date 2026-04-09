import React from "react";
import Profile from "../components/Profile";

function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

      <div style={{ padding: "20px", textAlign: "left" }}>
        <h1>How To Use</h1>
        <p>Text will go here about how to use</p>
      </div>

      <div style={{ padding: "20px", minWidth: 320 }}>
        <Profile />
      </div>

    </div>
  );
}

export default Home;