import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AboutBirdCard from "../components/AboutBirdCard";

const MY_FAVORITE_CODES = ["sanchi", "wooduc", "rthhum", "comloo"];

function About() {
  const [favoriteBirds, setFavoriteBirds] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem("birds-with-photos");
    if (cached) {
      const allBirds = JSON.parse(cached);
      const found = MY_FAVORITE_CODES
        .map(code => allBirds.find(b => b.speciesCode === code))
        .filter(Boolean);
      setFavoriteBirds(found);
    }
  }, []);

  return (
    <div className="about-page">
      <Container className="about-container">

        <section className="about-section">
          <h1 className="about-name">Kendall Scholly</h1>
          <p className="about-subtitle">
            BS Psychology · Minors in Computer Science & Data Science · UW–Madison
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-heading">Why Feather Deck?</h2>
          <p className="about-body">
            Outside of school and class I spend most of my time outdoors.
            Over the summer I picked up bird watching at the UW Arboretum and often want to
            memorize the names of the birds I see. I created Feather Deck as a way to study the
            local birds in Dane County.
          </p>
        </section>

        <section className="about-section">
  <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", justifyContent: "space-between" }}>
  
  {/* 2x2 bird grid on the left */}
  <div style={{ flexShrink: 0 }}>
    <h2 className="about-section-heading">Four Favorite Birds</h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", width: "320px" }}>
      {favoriteBirds.map(bird => (
        <AboutBirdCard key={bird.commonName} {...bird} />
      ))}
    </div>
  </div>

  {/* Resume on the right */}
  <div style={{ width: "500px", flexShrink: 0 }}>
    <h2 className="about-section-heading">Résumé</h2>
    <iframe
      src="/p31/Kendall_Scholly_Resume.pdf"
      title="Kendall Scholly Resume"
      style={{ width: "100%", height: "480px", border: "1px solid var(--fd-border)", borderRadius: 10 }}
    />
  </div>

</div>
</section>

      </Container>
    </div>
  );
}

export default About;