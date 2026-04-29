import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AboutBirdCard from "../components/AboutBirdCard";
import Resume from '../components/Resume';

const MY_FAVORITE_CODES = ["comloo", "sancra", "osprey", "norfli"];

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
            BS Psychology || Minors in Computer Science & Data Science - UW–Madison
          </p>
          <button onClick={() => window.open("https://www.linkedin.com/in/kendallscholly", "_blank")}>
             LinkedIn
          </button>
        </section>

        <section className="about-section">
          <h2 className="about-section-heading">Why Feather Deck?</h2>
          <p className="about-body">
            Outside of school and class I spend most of my time outdoors.
            Over the summer I picked up bird watching at the UW Arboretum where I used the Cornell Merlin 
            app to memorize the different bird calls I heard. After familiarizing myself with many bird species I began memorizing them visually.
            I created Feather Deck as a way to study the local birds in my area. I hope that other people
            can see the beauty in noticing the wildlife that lives around us and above us.
          </p>
        </section>

        <section className="about-section">
  <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", justifyContent: "space-between" }}>
  
  {/* 2x2 bird grid on the left */}
  <div style={{ flexShrink: 0 }}>
    <h2 className="about-section-heading">My Four Favorite Birds</h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", width: "500px" }}>
      {favoriteBirds.map(bird => (
        <AboutBirdCard key={bird.commonName} {...bird} />
      ))}
    </div>
  </div>
  <div>
    <Resume/>
  </div>
</div>
</section>
      </Container>
    </div>
  );
}

export default About;